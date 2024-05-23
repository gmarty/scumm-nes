import Parser from './parser.js';

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

  // Parse gfx nametable.
  const unk3 = parser.getUint16();
  const unk4 = parser.getUint8();
  const width = parser.getUint8() + 1;
  const height = parser.getUint8() + 1;

  assert(unk3 === 1, 'Unknown 3 is not 1.');
  assert(width === 32, 'Title width is not 32.');
  assert(height === 30, 'Title height is not 30.');

  const nametable = Array(width * height);
  n = 0;
  while (n < nametable.length) {
    const loop = parser.getUint8();
    if (loop & 0x80) {
      for (let j = 0; j < (loop & 0x7f); j++) {
        nametable[n++] = parser.getUint8();
      }
    } else {
      const data = parser.getUint8();
      for (let j = 0; j < (loop & 0x7f); j++) {
        nametable[n++] = data;
      }
    }
  }

  // Slice the nametableObj so it is formatted like rooms'.
  const nametableObj = new Array(height);
  for (let i = 0; i < height; i++) {
    nametableObj[i] = nametable.slice(i * width, (i + 1) * width);
  }

  // Parse gfx attrtable.
  const unk5 = parser.getUint16();
  const unk6 = parser.getUint8();
  const attrWidth = parser.getUint8() + 1;
  const attrHeight = parser.getUint8() + 1;

  assert(unk5 === 0xc002, 'Unknown 5 is not 1.');
  assert(unk6 === 0x23, 'Unknown 6 is not 0x23.');
  assert(attrWidth === 8, 'attrWidth is not 8.');
  assert(attrHeight === 8, 'attrHeight is not 8.');

  const attributes = Array(attrWidth * attrHeight).fill(0);
  n = 0;
  while (n < attributes.length) {
    const loop = parser.getUint8();
    if (loop & 0x80) {
      for (let j = 0; j < (loop & 0x7f); j++) {
        attributes[n++] = parser.getUint8();
      }
    } else {
      const data = parser.getUint8();
      for (let j = 0; j < (loop & 0x7f); j++) {
        attributes[n++] = data;
      }
    }
  }

  // Parse palette.
  const stepNum = parser.getUint8();

  assert(stepNum === 3, 'stepNum is not 3.');

  const palette = [];
  for (let i = 0; i < 16; i++) {
    palette[i] = parser.getUint8();
  }

  const endOfData = parser.getUint8();

  assert(endOfData === 0xff, 'endOfData is not 0xff.');

  // metadata.decompressedSize = gfx.length;
  metadata.size = parser.pointer;

  return {
    metadata,
    numberOfTiles,
    gfx,
    width,
    height,
    nametableObj,
    attrWidth,
    attrHeight,
    attributes,
    stepNum,
    palette,
    endOfData,
    unk1,
    unk2,
    unk3,
    unk4,
    unk5,
    unk6,
  };
};

export default parseTitles;
