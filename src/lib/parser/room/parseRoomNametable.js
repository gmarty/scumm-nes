import Parser from '../parser.js';

const assert = console.assert;

const parseRoomNametable = (arrayBuffer, offset = 0, width = 0) => {
  const parser = new Parser(arrayBuffer);
  const tileset = parser.getUint8();

  const palette = [];
  for (let i = 0; i < 16; i++) {
    palette[i] = parser.getUint8();
  }

  const nametableObj = Array(16);
  for (let i = 0; i < 16; i++) {
    nametableObj[i] = Array(64).fill(0);
    nametableObj[i][0] = 0;
    nametableObj[i][1] = 0;

    assert(
      nametableObj[i][0] === 0,
      'Gfx nametable strip does not start with 0x00 0x00.',
    );
    assert(
      nametableObj[i][1] === 0,
      'Gfx nametable strip does not start with 0x00 0x00.',
    );

    let n = 0;
    while (n < width) {
      const loop = parser.getUint8();
      if (loop & 0x80) {
        for (let j = 0; j < (loop & 0x7f); j++) {
          nametableObj[i][2 + n++] = parser.getUint8();
        }
      } else {
        const data = parser.getUint8();
        for (let j = 0; j < (loop & 0x7f); j++) {
          nametableObj[i][2 + n++] = data;
        }
      }
    }

    assert(
      nametableObj[i][62] === 0,
      'Gfx nametable strip does not end with 0x00 0x00.',
    );
    assert(
      nametableObj[i][63] === 0,
      'Gfx nametable strip does not end with 0x00 0x00.',
    );
  }

  const nametableMap = {
    type: 'nametable',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    nametable: {
      tileset,
      palette,
      nametableObj,
    },
    nametableMap,
  };
};

export default parseRoomNametable;
