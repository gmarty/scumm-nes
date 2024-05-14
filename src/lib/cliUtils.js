import { extname } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import crc32 from './crc32.js';
import { isJapaneseVersion, getResFromCrc32 } from './getResFromCrc32.js';
import { hex, hasNesHeader } from './utils.js';

const BANK_SIZE = 0x4000;
// prettier-ignore
const NES_HEADER = new Uint8Array([
  0x4e, 0x45, 0x53, 0x1a, // NES
  0x10, 0x00, 0x12, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
]);

const loadRom = async (romPath = '') => {
  const inputExtname = extname(romPath).toLowerCase();
  if (inputExtname !== '.prg' && inputExtname !== '.nes') {
    throw new Error('Only PRG and NES files are accepted.');
  }

  let rom;
  try {
    rom = await readFile(romPath);
    rom = rom.buffer;
  } catch (err) {
    throw new Error(err);
  }

  // Remove the NES header, so we keep the PRG only.
  if (hasNesHeader(rom)) {
    rom = rom.slice(16);
  }

  const dataView = new DataView(rom);
  const hash = crc32(dataView);

  if (isJapaneseVersion(hash)) {
    throw new Error('The Japanese Famicom version is not supported.');
  }

  const res = getResFromCrc32(hash);

  if (!res) {
    throw new Error(
      `The file at '${romPath}' is not a valid ROM of Maniac Mansion on NES.`,
    );
  }

  return { rom, res, hash };
};

const saveRom = async (romPath = '', buffer) => {
  if (!hasNesHeader(buffer)) {
    buffer = prependNesHeader(buffer);
  }

  try {
    await writeFile(romPath, Buffer.from(buffer));
  } catch (err) {
    throw new Error(err);
  }
};

// Overwrite part of a ROM with a buffer at a given offset.
// Return true if some data were overwritten.
const inject = (rom, buffer, offset = 0, length = null) => {
  if (buffer.byteLength === 0) {
    return false;
  }

  if (Number.isInteger(length) && buffer.byteLength > length) {
    console.warn(
      'Injected buffer is larger than allocated space. This may result in malfunctions.',
    );
  }

  const view = new DataView(rom);
  const bufferView = new DataView(buffer);
  let overwrites = false;

  for (let i = 0; i < buffer.byteLength; i++) {
    if (view.getUint8(offset + i) !== bufferView.getUint8(i)) {
      view.setUint8(offset + i, bufferView.getUint8(i));
      overwrites = true;
    }
  }

  if (Number.isInteger(length)) {
    // Pad the rest of the allocated space with 0xff.
    for (let i = buffer.byteLength; i < length; i++) {
      if (view.getUint8(offset + i) !== 0xff) {
        view.setUint8(offset + i, 0xff);
        overwrites = true;
      }
    }
  }

  return overwrites;
};

const stringifyResources = (hash, size, resources, res) => {
  resources.rooms.forEach((item) => {
    delete item.buffer;
  });
  resources.roomgfx.forEach((item) => delete item.buffer);
  resources.preps.forEach((item) => delete item.buffer);

  const data = {
    metadata: {
      crc32: `0x${hex(hash)}`,
      size,
      version: res.version,
      lang: res.lang,
    },
    resources,
  };

  return JSON.stringify(data, null, '  ');
};

// Append a NES header to a PRG buffer.
const prependNesHeader = (prg) => {
  const rom = new ArrayBuffer(NES_HEADER.length + prg.byteLength);
  const romView = new DataView(rom);
  const prgView = new DataView(prg);

  for (let i = 0; i < NES_HEADER.length; i++) {
    romView.setUint8(i, NES_HEADER[i]);
  }

  const banksNum = prg.byteLength / BANK_SIZE;
  romView.setUint16(4, banksNum, true); // Patch the NES header.

  for (let i = NES_HEADER.length; i < rom.byteLength; i++) {
    romView.setUint8(i, prgView.getUint8(i - NES_HEADER.length));
  }

  return rom;
};

// Expand a PRG by adding 16 banks of memory.
const expandRom = (rom) => {
  const romView = new DataView(rom);
  const romSize = rom.byteLength + 16 * BANK_SIZE;
  const newRom = new ArrayBuffer(romSize);
  const newRomView = new DataView(newRom);

  // Copy over the ROM data to the new buffer.
  for (let i = 0; i < romView.byteLength; i++) {
    newRomView.setUint8(i, romView.getUint8(i));
  }

  // Fill the blank memory with 0xff.
  for (let i = romView.byteLength; i < romSize; i++) {
    newRomView.setUint8(i, 0xff);
  }

  return newRom;
};

export { loadRom, saveRom, inject, stringifyResources, expandRom };
