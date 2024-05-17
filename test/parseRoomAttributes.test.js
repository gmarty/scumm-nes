import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import parseRoomAttributes from '../src/lib/parser/room/parseRoomAttributes.js';
import serialiseRoomAttributes from '../src/lib/serialiser/room/serialiseRoomAttributes.js';

const roomAttributesEmptyBuffer = () => {
  const buffer = new ArrayBuffer(64);
  const view = new DataView(buffer);
  view.setUint8(0x00, 64);
  view.setUint8(0x01, 1);
  return buffer;
};

const roomAttributesBuffer = () => {
  const array = [
    0x88, 0xff, 0x00, 0x00, 0xff, 0x33, 0x00, 0xcc, 0xce, 0x88, 0xff, 0x00,
    0x00, 0xff, 0x33, 0x44, 0x1c, 0xcc, 0x88, 0xff, 0xc0, 0xf3, 0xff, 0x37,
    0x00, 0x00, 0xcd, 0x88, 0xff, 0x50, 0xff, 0xf7, 0xfd, 0x30, 0xcc, 0xfc,
  ];
  const buffer = new ArrayBuffer(array.length);
  const view = new DataView(buffer);
  array.forEach((v, i) => view.setUint8(i, v));
  return buffer;
};

describe('parseRoomAttributes', () => {
  it('should return an array.', () => {
    const { attributes } = parseRoomAttributes(roomAttributesEmptyBuffer());

    assert.ok(Array.isArray(attributes));
    assert.equal(attributes.length, 64);
  });

  it('should pad data with 0x00 for short rooms.', () => {
    const { attributes } = parseRoomAttributes(roomAttributesBuffer(), 0, 28);

    for (let i = 0; i < 4; i++) {
      for (let j = 8; j < 16; j++) {
        assert.equal(attributes[i * 16 + j], 0x00);
      }
    }

    assert.equal(attributes.length, 64);
  });

  it('should return a map object.', () => {
    const { attributesMap } = parseRoomAttributes(roomAttributesEmptyBuffer());

    assert.equal(typeof attributesMap, 'object');
    assert.equal(attributesMap.from, 0);
    assert.equal(attributesMap.to, 2);
  });

  it('should return a map object with a start offset.', () => {
    const { attributesMap } = parseRoomAttributes(
      roomAttributesEmptyBuffer(),
      0xabc,
    );

    assert.equal(attributesMap.from, 0xabc);
    assert.equal(attributesMap.to, 0xabe);
  });

  it('should be the inverse of serialiseRoomAttributes.', () => {
    const initialBuffer = roomAttributesBuffer();
    const { attributes } = parseRoomAttributes(initialBuffer, 0, 28);
    const buffer = serialiseRoomAttributes(attributes, 28);

    assert.deepEqual(initialBuffer, buffer);
  });
});
