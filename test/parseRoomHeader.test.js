import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import parseRoomHeader from '../src/lib/parser/room/parseRoomHeader.js';
import serialiseRoomHeader from '../src/lib/serialiser/room/serialiseRoomHeader.js';

const roomHeaderBuffer = () => {
  const array = [
    0x0c, 0x0d, 0x00, 0x24, 0x3c, 0x00, 0x10, 0x00, 0x00, 0x00, 0x10, 0x01,
    0xc5, 0x03, 0xfa, 0x03, 0x2d, 0x00, 0x2d, 0x00, 0x14, 0x6d, 0x00, 0x01,
    0xca, 0x0c, 0xfb, 0x0c,
  ];
  const buffer = new ArrayBuffer(array.length);
  const view = new DataView(buffer);
  array.forEach((v, i) => view.setUint8(i, v));
  return buffer;
};

describe('parseRoomHeader', () => {
  it('should return a non empty object.', () => {
    const { header } = parseRoomHeader(roomHeaderBuffer());

    assert.equal(typeof header, 'object');
    assert.deepEqual(Object.keys(header), [
      'chunkSize',
      'unk1',
      'unk2',
      'width',
      'height',
      'unk3',
      'nametableOffs',
      'attrOffs',
      'maskOffs',
      'unk4',
      'unk5',
      'objectsNum',
      'boxOffs',
      'soundsNum',
      'scriptsNum',
      'excdOffs',
      'encdOffs',
    ]);
  });

  it('should return a map object.', () => {
    const { headerMap } = parseRoomHeader(roomHeaderBuffer());

    assert.equal(typeof headerMap, 'object');
    assert.equal(headerMap.from, 0);
    assert.equal(headerMap.to, 28);
  });

  it('should be the inverse of serialiseRoomHeader.', () => {
    const initialBuffer = roomHeaderBuffer();
    const { header } = parseRoomHeader(initialBuffer);
    const buffer = serialiseRoomHeader(header);

    assert.deepEqual(initialBuffer, buffer);
  });
});
