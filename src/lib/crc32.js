const makeCRCTable = () => {
  const crcTable = Array(256);
  let c;
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }
  return crcTable;
};

const crcTable = makeCRCTable();

const crc32 = (dataView) => {
  let crc = 0 ^ -1;
  for (let i = 0; i < dataView.byteLength; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ dataView.getUint8(i)) & 0xff];
  }
  return (crc ^ -1) >>> 0;
};

export default crc32;
