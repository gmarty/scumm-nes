import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import parseRoomMatrix from '../src/lib/parser/room/parseRoomMatrix.js';
import serialiseRoomMatrix from '../src/lib/serialiser/room/serialiseRoomMatrix.js';

const roomMatrixEmptyBuffer = (boxNum) => {
  const buffer = new ArrayBuffer((1 + boxNum) * boxNum);
  const view = new DataView(buffer);
  for (let i = 0; i < boxNum; i++) {
    view.setUint8(i, i * boxNum);
  }
  return buffer;
};

const roomMatrixBuffer = () => {
  const array = [
    0x00, 0x03, 0x06, 0x00, 0x01, 0x01, 0x00, 0x01, 0x02, 0x01, 0x01, 0x02,
  ];
  const buffer = new ArrayBuffer(array.length);
  const view = new DataView(buffer);
  array.forEach((v, i) => view.setUint8(i, v));
  return buffer;
};

describe('parseRoomMatrix', () => {
  it('should return an array.', () => {
    const { matrix } = parseRoomMatrix(roomMatrixEmptyBuffer(0), 0, 0);

    assert.ok(Array.isArray(matrix));
    assert.equal(matrix.length, 0);
  });

  it('should parse several matrices.', () => {
    const { matrix } = parseRoomMatrix(roomMatrixEmptyBuffer(5), 0, 5);

    assert.equal(matrix.length, 25);
  });

  it('should return an array of unknown values.', () => {
    const { matrixUnks } = parseRoomMatrix(roomMatrixEmptyBuffer(0), 0, 0);

    assert.ok(Array.isArray(matrixUnks));
    assert.equal(matrixUnks.length, 0);
  });

  it('should parse several unknown values.', () => {
    const { matrixUnks } = parseRoomMatrix(roomMatrixEmptyBuffer(5), 0, 5);

    assert.equal(matrixUnks.length, 5);
  });

  it('should return a map object.', () => {
    const { matrixMap } = parseRoomMatrix(roomMatrixEmptyBuffer(1), 0, 1);

    assert.equal(typeof matrixMap, 'object');
    assert.equal(matrixMap.from, 0);
    assert.equal(matrixMap.to, 2);
  });

  it('should return a map object with a start offset.', () => {
    const { matrixMap } = parseRoomMatrix(roomMatrixEmptyBuffer(1), 0xabc, 1);

    assert.equal(matrixMap.from, 0xabc);
    assert.equal(matrixMap.to, 0xabe);
  });

  it('should return a map object with an end offset.', () => {
    const { matrixMap } = parseRoomMatrix(roomMatrixEmptyBuffer(5), 0xabc, 5);

    assert.equal(matrixMap.from, 0xabc);
    assert.equal(matrixMap.to, 0xada);
  });

  it('should be the inverse of serialiseRoomMatrix.', () => {
    const initialBuffer = roomMatrixBuffer();
    const { matrix } = parseRoomMatrix(initialBuffer, 0, 3);
    const buffer = serialiseRoomMatrix(matrix);

    assert.deepEqual(initialBuffer, buffer);
  });
});
