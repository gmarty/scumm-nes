import Parser from '../parser.js';

const assert = console.assert;

const parseRoomBoxes = (arrayBuffer, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const boxNum = parser.getUint8();

  const boxes = [];
  for (let i = 0; i < boxNum; i++) {
    const uy = parser.getUint8();
    const ly = parser.getUint8();
    const ulx = parser.getUint8();
    const urx = parser.getUint8();
    const llx = parser.getUint8();
    const lrx = parser.getUint8();
    const mask = parser.getUint8();
    const flags = parser.getUint8();

    assert(ly >= uy, 'Y box bounds are out of order.');

    assert(mask === 0 || mask === 1, 'Box mask is neither 0 nor 1.');
    assert(flags === 0 || flags === 5, 'Box flag is neither 0 nor 5.');

    boxes.push({ uy, ly, ulx, urx, llx, lrx, mask, flags });
  }

  assert(boxes.length > 0, 'Room has no boxes.');

  const boxesMap = {
    type: 'boxes',
    from: offset,
    to: offset + parser.pointer,
  };

  return { boxes, boxesMap };
};

export default parseRoomBoxes;
