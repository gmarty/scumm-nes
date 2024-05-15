import res from './resources.js';

const BASE_ROMS = res.map(({ metadata }) => metadata);
BASE_ROMS.sort((a, b) => a.name.localeCompare(b.name));

const isJapaneseVersion = (c) => c === 0x3da2085e || c === 0xf526cea8;
const getResFromCrc32 = (c) =>
  res.find(({ crc32, crc32Rom }) => crc32 === c || crc32Rom === c) ?? null;
const getResFromBaseRom = (baseRom) =>
  res.find(({ metadata: { name, alpha2code, alpha3code } }) => {
    baseRom = baseRom.toLowerCase();
    return (
      baseRom === name.toLowerCase() ||
      baseRom === alpha2code.toLowerCase() ||
      baseRom === alpha3code.toLowerCase()
    );
  }) ?? null;

export { BASE_ROMS, isJapaneseVersion, getResFromCrc32, getResFromBaseRom };
