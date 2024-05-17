import Parser from '../parser.js';

const parseRoomAttributes = (arrayBuffer, offset = 0, width = 0) => {
  const parser = new Parser(arrayBuffer);

  const attributes = Array(64).fill(0);
  let n = 0;
  while (n < 64) {
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
    if (!(n & 7) && width === 28) {
      n += 8;
    }
  }

  const attributesMap = {
    type: 'attributes',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    attributes,
    attributesMap,
  };
};

export default parseRoomAttributes;
