import parsePalette from '../parsePalette.js';

const parseSprpals = (arrayBuffer, i = 0, offset = 0) => {
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };
  const map = [];

  const { palette, paletteMap } = parsePalette(arrayBuffer, offset);

  map.push(paletteMap);

  return {
    metadata,
    palette,
    map,
  };
};

export default parseSprpals;
