import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import serialiseRoomAttributes from '../src/lib/serialiser/room/serialiseRoomAttributes.js';
import parseRoomAttributes from '../src/lib/parser/room/parseRoomAttributes.js';

const roomAttributes = [
  51, 64, 220, 63, 51, 0, 64, 19, 0, 0, 0, 0, 68, 85, 85, 204, 243, 4, 253, 17,
  170, 12, 119, 17, 0, 0, 0, 0, 68, 85, 85, 204, 255, 204, 255, 29, 0, 51, 0,
  51, 0, 0, 0, 0, 0, 85, 85, 223, 247, 245, 245, 85, 85, 85, 85, 119, 85, 93,
  87, 81, 85, 5, 5, 253,
];

describe('serialiseRoomAttributes', () => {
  it('should return an instance of ArrayBuffer.', () => {
    const buffer = serialiseRoomAttributes(roomAttributes, 60);
    assert.ok(buffer instanceof ArrayBuffer);
  });

  it('should serialise a room gfx attrtable.', () => {
    const buffer = serialiseRoomAttributes(roomAttributes, 60);
    const view = new DataView(buffer);

    assert.equal(view.getUint8(0x00), 136);
    assert.equal(view.getUint8(0x01), 51);
    assert.equal(view.getUint8(0x02), 64);
  });

  it('should be the inverse of parseRoomAttributes.', () => {
    const buffer = serialiseRoomAttributes(roomAttributes, 60);
    const { attributes } = parseRoomAttributes(buffer, 0, 60);

    assert.deepEqual(roomAttributes, attributes);
  });
});
