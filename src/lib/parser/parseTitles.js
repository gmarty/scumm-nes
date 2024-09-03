import Parser from './Parser.js';
import parsePalette from './parsePalette.js';

const assert = console.assert;

const parseTitles = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
    decompressedSize: 0,
  };
  const map = [];

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

  const nametableTmp = Array(width * height);
  n = 0;
  while (n < nametableTmp.length) {
    const loop = parser.getUint8();
    if (loop & 0x80) {
      for (let j = 0; j < (loop & 0x7f); j++) {
        nametableTmp[n++] = parser.getUint8();
      }
    } else {
      const data = parser.getUint8();
      for (let j = 0; j < (loop & 0x7f); j++) {
        nametableTmp[n++] = data;
      }
    }
  }

  // Slice the nametable so it is formatted like rooms'.
  const nametable = new Array(height);
  for (let i = 0; i < height; i++) {
    nametable[i] = nametableTmp.slice(i * width, (i + 1) * width);
  }

  // Parse gfx attrtable.
  const unk5 = parser.getUint16();
  const unk6 = parser.getUint8();
  const attrWidth = parser.getUint8() + 1;
  const attrHeight = parser.getUint8() + 1;

  assert(unk5 === 0xc002, 'Unknown 5 is not 0xc002.');
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

  const stepNum = parser.getUint8();

  assert(stepNum === 3, 'stepNum is not 3.');

  // Parse the palette.
  const { palette, paletteMap } = parsePalette(
    arrayBuffer.slice(parser.pointer, parser.pointer + 16),
    parser.pointer,
  );

  map.push(paletteMap);

  const endOfDataParser = new Parser(
    arrayBuffer.slice(parser.pointer + 16, parser.pointer + 17),
  );
  const endOfData = endOfDataParser.getUint8();

  assert(endOfData === 0xff, 'endOfData is not 0xff.');

  metadata.decompressedSize = gfx.length + nametableTmp.length + attributes.length;

  return {
    metadata,
    numberOfTiles,
    gfx,
    width,
    height,
    nametable,
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
    map,
  };
};

export default parseTitles;
