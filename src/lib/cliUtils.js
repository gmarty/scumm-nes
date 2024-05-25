import { extname } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import crc32 from './crc32.js';
import {
  BASE_ROMS,
  isJapaneseVersion,
  getResFromCrc32,
  getResFromBaseRom,
} from './getResFromCrc32.js';
import { hex } from './utils.js';
import { hasNesHeader, prependNesHeader } from './romUtils.js';

const BANK_SIZE = 0x4000;

const loadRom = async (romPath = '', baseRom = null) => {
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

  let res;
  if (baseRom) {
    res = getResFromBaseRom(baseRom);
    if (typeof baseRom !== 'string' || !res) {
      const baseRomList = BASE_ROMS.map(
        ({ name, alpha2code }) => `${alpha2code} (${name})`,
      );
      baseRomList.sort();
      const formatter = new Intl.ListFormat('en-GB', {
        style: 'long',
        type: 'conjunction',
      });
      throw new Error(
        `Base ROM only accepts the following values: ${formatter.format(baseRomList)}.`,
      );
    }
  } else {
    res = getResFromCrc32(hash);
  }

  if (!res) {
    throw new Error(
      `The file '${romPath}' is not a valid ROM of Maniac Mansion on NES. If it's a ROM hack, pass the base ROM version to --base-rom.`,
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

export { loadRom, saveRom, stringifyResources, expandRom };
