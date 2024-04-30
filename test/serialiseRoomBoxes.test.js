import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import serialiseRoomBoxes from '../src/lib/serialiser/room/serialiseRoomBoxes.js';
import parseRoomBoxes from '../src/lib/parser/room/parseRoomBoxes.js';

const roomBoxes = [
  { uy: 59, ly: 62, ulx: 4, urx: 9, llx: 2, lrx: 9, mask: 0, flags: 0 },
  { uy: 60, ly: 62, ulx: 10, urx: 35, llx: 10, lrx: 35, mask: 0, flags: 0 },
  { uy: 60, ly: 62, ulx: 36, urx: 56, llx: 36, lrx: 58, mask: 0, flags: 0 },
];

describe('serialiseRoomBoxes', () => {
  it('should return an instance of ArrayBuffer.', () => {
    const buffer = serialiseRoomBoxes(roomBoxes);
    assert.ok(buffer instanceof ArrayBuffer);
  });

  it('should serialise a room box.', () => {
    const buffer = serialiseRoomBoxes(roomBoxes);
    const view = new DataView(buffer);

    assert.equal(view.getUint8(0x00), 3);
    assert.equal(view.getUint8(0x01), 59);
    assert.equal(view.getUint8(0x09), 60);
    assert.equal(view.getUint8(0x11), 60);
    assert.equal(buffer.byteLength, 25);
  });

  it('should be the inverse of parseRoomHeader.', () => {
    const buffer = serialiseRoomBoxes(roomBoxes);
    const { boxes } = parseRoomBoxes(buffer);

    assert.deepEqual(roomBoxes, boxes);
  });
});
