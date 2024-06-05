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

    const x = sprdata2 >> 2;
    const y = sprdata0 & 0x7f;
    const flip = sprdata0 & 0x80 ? true : false;
    const paletteId = (sprdata2 & 0x03) << 2;

    sprdata.push({
      x,
      y,
      tile,
      flip,
      paletteId,
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
