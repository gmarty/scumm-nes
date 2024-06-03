import Parser from '../Parser.js';

const parseSprdata = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
    decompressedSize: 0,
  };

  const sprdata = [];
  for (let i = 0; i < arrayBuffer.byteLength; i += 3) {
    const sprdata0 = parser.getInt8();
    const tile = parser.getUint8();
    const sprdata2 = parser.getInt8();

    const mask = sprdata0 & 0x80 ? 0x01 : 0x80;
    let y = (sprdata0 << 1) >> 1;

    const sprpal = (sprdata2 & 0x03) << 2;
    let x = sprdata2 >> 2;

    sprdata.push({
      x,
      y,
      tile,
      mask,
      sprpal,
    });
  }

  metadata.decompressedSize = sprdata.length;

  const map = {
    type: 'sprdata',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    metadata,
    sprdata,
    map,
  };
};

export default parseSprdata;
