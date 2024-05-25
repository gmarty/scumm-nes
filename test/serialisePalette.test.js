import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import serialisePalette from '../src/lib/serialiser/serialisePalette.js';
import parsePalette from '../src/lib/parser/parsePalette.js';

const paletteFixture = [
  0x0d, 0x07, 0x27, 0x3c, 0x0d, 0x17, 0x2a, 0x3a, 0x0d, 0x0d, 0x2a, 0x28, 0x0d,
  0x0d, 0x37, 0x20,
];

describe('serialisePalette', () => {
  it('should return an instance of ArrayBuffer.', () => {
    const buffer = serialisePalette(paletteFixture);
    assert.ok(buffer instanceof ArrayBuffer);
  });

  it('should serialise a palette.', () => {
    const buffer = serialisePalette(paletteFixture);
    const view = new DataView(buffer);

    assert.equal(view.getUint8(0x00), 0x0d);
    assert.equal(view.getUint8(0x01), 0x07);
    assert.equal(view.getUint8(0x02), 0x27);
    assert.equal(view.getUint8(0x03), 0x3c);
    assert.equal(view.getUint8(0x04), 0x0d);
    assert.equal(view.getUint8(0x08), 0x0d);
    assert.equal(view.getUint8(0x0c), 0x0d);
    assert.equal(buffer.byteLength, 16);
  });

  it('should be the inverse of parseRoomHeader.', () => {
    const buffer = serialisePalette(paletteFixture);
    const { palette } = parsePalette(buffer);

    assert.deepEqual(paletteFixture, palette);
  });
});
