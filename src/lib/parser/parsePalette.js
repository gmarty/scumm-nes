import Parser from './parser.js';

// Generic palette parser used in rooms and title screens.
const parsePalette = (arrayBuffer, offset = 0) => {
  const parser = new Parser(arrayBuffer);

  const palette = Array(16);
  for (let i = 0; i < 16; i++) {
    palette[i] = parser.getUint8();
  }

  const paletteMap = {
    type: 'palette',
    from: offset,
    to: offset + 16,
  };

  return {
    palette,
    paletteMap,
  };
};

export default parsePalette;
