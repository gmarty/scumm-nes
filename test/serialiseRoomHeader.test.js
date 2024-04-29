import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import serialiseRoomHeader from '../src/lib/serialiser/room/serialiseRoomHeader.js';
import parseRoomHeader from '../src/lib/parser/room/parseRoomHeader.js';

const room = {
  header: {
    chunkSize: 3340,
    unk1: 0,
    unk2: 36,
    width: 60,
    height: 16,
    unk3: 0,
    nametableOffs: 272,
    attrOffs: 965,
    maskOffs: 1018,
    unk4: 45,
    unk5: 45,
    objectsNum: 20,
    boxOffs: 109,
    soundsNum: 0,
    scriptsNum: 1,
    excdOffs: 3274,
    encdOffs: 3323,
  },
};

describe('serialiseRoomHeader', () => {
  it('should return an instance of ArrayBuffer.', () => {
    const buffer = serialiseRoomHeader(room.header);
    assert.ok(buffer instanceof ArrayBuffer);
  });

  it('should serialise a room header.', () => {
    const buffer = serialiseRoomHeader(room.header);
    const view = new DataView(buffer);

    assert.equal(view.getUint8(2), 0x00);
  });

  it('should be the inverse of parseRoomHeader.', () => {
    const buffer = serialiseRoomHeader(room.header);
    const header = parseRoomHeader(buffer);

    assert.deepEqual(room.header, header);
  });
});
