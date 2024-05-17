import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import parseRoomBoxes from '../src/lib/parser/room/parseRoomBoxes.js';
import serialiseRoomBoxes from '../src/lib/serialiser/room/serialiseRoomBoxes.js';

const roomBoxesEmptyBuffer = (boxNum) => {
  const buffer = new ArrayBuffer(1 + boxNum * 8);
  const view = new DataView(buffer);
  view.setUint8(0x00, boxNum); // Set the value of boxNum.
  return buffer;
};

const roomBoxesBuffer = () => {
  const array = [
    0x03, 0x3b, 0x3e, 0x04, 0x09, 0x02, 0x09, 0x00, 0x00, 0x3c, 0x3e, 0x0a,
    0x23, 0x0a, 0x23, 0x00, 0x00, 0x3c, 0x3e, 0x24, 0x38, 0x24, 0x3a, 0x00,
    0x00,
  ];
  const buffer = new ArrayBuffer(array.length);
  const view = new DataView(buffer);
  array.forEach((v, i) => view.setUint8(i, v));
  return buffer;
};

describe('parseRoomBoxes', () => {
  it('should return an array.', () => {
    const { boxes } = parseRoomBoxes(roomBoxesEmptyBuffer(1));

    assert.ok(Array.isArray(boxes));
    assert.equal(boxes.length, 1);
  });

  it('should parse several room boxes.', () => {
    const { boxes } = parseRoomBoxes(roomBoxesEmptyBuffer(5));

    assert.equal(boxes.length, 5);
  });

  it('should return a map object.', () => {
    const { boxesMap } = parseRoomBoxes(roomBoxesEmptyBuffer(1));

    assert.equal(typeof boxesMap, 'object');
    assert.equal(boxesMap.from, 0);
    assert.equal(boxesMap.to, 9);
  });

  it('should return a map object with a start offset.', () => {
    const { boxesMap } = parseRoomBoxes(roomBoxesEmptyBuffer(1), 0xabc);

    assert.equal(boxesMap.from, 0xabc);
    assert.equal(boxesMap.to, 0xac5);
  });

  it('should return a map object with an end offset.', () => {
    const { boxesMap } = parseRoomBoxes(roomBoxesEmptyBuffer(5), 0xabc);

    assert.equal(boxesMap.from, 0xabc);
    assert.equal(boxesMap.to, 0xae5);
  });

  it('should be the inverse of serialiseRoomBoxes.', () => {
    const initialBuffer = roomBoxesBuffer();
    const { boxes } = parseRoomBoxes(initialBuffer);
    const buffer = serialiseRoomBoxes(boxes);

    assert.deepEqual(initialBuffer, buffer);
  });
});
