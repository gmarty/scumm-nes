import Parser from '../Parser.js';

const assert = console.assert;

const parseCostumeGfx = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
    decompressedSize: 0,
  };

  const numberOfTiles = parser.getUint8();

  const gfx = [];
  while (parser.pointer < arrayBuffer.byteLength) {
    const loop = parser.getUint8();
    if (loop & 0x80) {
      for (let j = 0; j < (loop & 0x7f); j++) {
        gfx.push(parser.getUint8());
      }
    } else {
      const data = parser.getUint8();
      for (let j = 0; j < (loop & 0x7f); j++) {
        gfx.push(data);
      }
    }
  }

  assert(
    numberOfTiles === gfx.length / 8 / 2,
    'Number of tiles byte does not match number of tiles decoded.',
  );

  metadata.decompressedSize = gfx.length;

  return {
    metadata,
    numberOfTiles,
    gfx,
  };
};

export default parseCostumeGfx;
