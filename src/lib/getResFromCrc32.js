import res from './resources';

const isJapaneseVersion = (c) => c === 0x3da2085e || c === 0xf526cea8;
const isPrototypeVersion = (c) => c === 0xde0c29a9 || c === 0xbba3ef7e;
const getResFromCrc32 = (c) =>
  res.find(({ crc32, crc32Rom }) => crc32 === c || crc32Rom === c) ?? null;

export { isJapaneseVersion, isPrototypeVersion, getResFromCrc32 };
