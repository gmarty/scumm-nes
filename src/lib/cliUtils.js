import { readFile } from 'node:fs/promises';
import crc32 from './crc32.js';
import { isJapaneseVersion, getResFromCrc32 } from './getResFromCrc32.js';
import { hex } from './utils.js';

const loadRom = async (romPath = '') => {
  let rom;
  try {
    rom = await readFile(romPath);
    rom = rom.buffer;
  } catch (err) {
    throw new Error(`Error opening file '${romPath}'.`);
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

const stringify = (hash, size, resources, res) => {
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

export { loadRom, stringify };
