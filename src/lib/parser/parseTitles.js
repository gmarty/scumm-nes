import Parser from './parser.js';
import { hex } from '../utils.js';

const assert = console.assert;

const parseTitles = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
    // decompressedSize: 0, // Commented out until the buffer size is known.
  };

  const unk1 = parser.getUint16(); // Probably the chunk length unused in titles.
  const unk2 = parser.getUint16();

  assert(unk1 === 0, 'Unknown 1 is not 0.');
  assert(unk2 === 0x0f10, 'Unknown 2 is not 0x0f10.');

  // Parse tileset.
  const numberOfTiles = parser.getUint8() + 1;

  console.log('numberOfTiles', numberOfTiles);

  const gfx = [];
  let n = 0;
  while (n < numberOfTiles * 16) {
    const loop = parser.getUint8();
    if (loop & 0x80) {
      for (let j = 0; j < (loop & 0x7f); j++) {
        gfx[n++] = parser.getUint8();
      }
    } else {
      const data = parser.getUint8();
      for (let j = 0; j < (loop & 0x7f); j++) {
        gfx[n++] = data;
      }
    }
  }

  assert(
    numberOfTiles === gfx.length / 8 / 2,
    'Number of tiles byte does not match number of tiles decoded.',
  );

  // metadata.decompressedSize = gfx.length;

  return {
    metadata,
    unk1,
    unk2,
    numberOfTiles,
    gfx,
  };
};

export default parseTitles;
