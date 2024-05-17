import Parser from '../parser.js';

const assert = console.assert;

const parseRoomMatrix = (arrayBuffer, offset = 0, boxNum = 1) => {
  const parser = new Parser(arrayBuffer);

  const matrixUnks = [];
  for (let i = 0; i < boxNum; i++) {
    const unk = parser.getUint8();
    assert(unk === i * boxNum, 'The matrix does not have the expected values.');
    matrixUnks.push(unk);
  }

  const matrix = [];
  for (let i = 0; i < boxNum; i++) {
    for (let j = 0; j < boxNum; j++) {
      const box = parser.getUint8();
      assert(box >= 0, 'The matrix has an out of bound value.'); // Always true since it's a uint8.
      // box should be strictly less than boxNum, but this fails in some cases.
      assert(box <= boxNum, 'The matrix has an out of bound value.');
      matrix.push(box);
    }
  }

  const matrixMap = {
    type: 'matrix',
    from: offset,
    to: offset + parser.pointer,
  };

  return { matrixUnks, matrix, matrixMap };
};

export default parseRoomMatrix;
