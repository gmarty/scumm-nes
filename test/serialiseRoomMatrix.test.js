import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import serialiseRoomMatrix from '../src/lib/serialiser/room/serialiseRoomMatrix.js';
import parseRoomMatrix from '../src/lib/parser/room/parseRoomMatrix.js';

const roomMatrix = [0, 1, 1, 0, 1, 2, 1, 1, 2];

describe('serialiseRoomMatrix', () => {
  it('should return an instance of ArrayBuffer.', () => {
    const buffer = serialiseRoomMatrix(roomMatrix);
    assert.ok(buffer instanceof ArrayBuffer);
  });

  it('should serialise a room matrix.', () => {
    const buffer = serialiseRoomMatrix(roomMatrix);
    const view = new DataView(buffer);

    assert.equal(view.getUint8(0x00), 0);
    assert.equal(view.getUint8(0x03), 0);
    assert.equal(view.getUint8(0x06), 0);
    assert.equal(view.getUint8(0x09), 1);
    assert.equal(buffer.byteLength, 12);
  });

  it('should be the inverse of parseRoomMatrix.', () => {
    const buffer = serialiseRoomMatrix(roomMatrix);
    const { matrix } = parseRoomMatrix(buffer, 0, 3);

    assert.deepEqual(roomMatrix, matrix);
  });
});
