import Parser from '../Parser.js';

const assert = console.assert;

const parseRoomNametable = (arrayBuffer, offset = 0, width = 0) => {
  const parser = new Parser(arrayBuffer);

  const nametable = Array(16);
  for (let i = 0; i < nametable.length; i++) {
    nametable[i] = Array(64).fill(0);
    nametable[i][0] = 0;
    nametable[i][1] = 0;

    assert(
      nametable[i][0] === 0,
      'Gfx nametable strip does not start with 0x00 0x00.',
    );
    assert(
      nametable[i][1] === 0,
      'Gfx nametable strip does not start with 0x00 0x00.',
    );

    let n = 0;
    while (n < width) {
      const loop = parser.getUint8();
      if (loop & 0x80) {
        for (let j = 0; j < (loop & 0x7f); j++) {
          nametable[i][2 + n++] = parser.getUint8();
        }
      } else {
        const data = parser.getUint8();
        for (let j = 0; j < (loop & 0x7f); j++) {
          nametable[i][2 + n++] = data;
        }
      }
    }

    assert(
      nametable[i][62] === 0,
      'Gfx nametable strip does not end with 0x00 0x00.',
    );
    assert(
      nametable[i][63] === 0,
      'Gfx nametable strip does not end with 0x00 0x00.',
    );
  }

  const nametableMap = {
    type: 'nametable',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    nametable,
    nametableMap,
  };
};

export default parseRoomNametable;
