import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import parsePalette from '../src/lib/parser/parsePalette.js';
import serialisePalette from '../src/lib/serialiser/serialisePalette.js';

const paletteEmptyBuffer = () => {
  return new ArrayBuffer(16);
};

const paletteBuffer = () => {
  const array = [
    0x0d, 0x07, 0x27, 0x3c, 0x0d, 0x17, 0x2a, 0x3a, 0x0d, 0x0d, 0x2a, 0x28,
    0x0d, 0x0d, 0x37, 0x20,
  ];
  const buffer = new ArrayBuffer(array.length);
  const view = new DataView(buffer);
  array.forEach((v, i) => view.setUint8(i, v));
  return buffer;
};

describe('parsePalette', () => {
  it('should return an array.', () => {
    const { palette } = parsePalette(paletteEmptyBuffer());

    assert.ok(Array.isArray(palette));
    assert.equal(palette.length, 16);
    assert.equal(palette[0], 0);
  });

  it('should return a map object.', () => {
    const { paletteMap } = parsePalette(paletteEmptyBuffer());

    assert.equal(typeof paletteMap, 'object');
    assert.equal(paletteMap.from, 0);
    assert.equal(paletteMap.to, 16);
  });

  it('should return a map object with a start offset.', () => {
    const { paletteMap } = parsePalette(paletteEmptyBuffer(), 0xabc);

    assert.equal(paletteMap.from, 0xabc);
    assert.equal(paletteMap.to, 0xacc);
  });

  it('should be the inverse of serialisePalette.', () => {
    const initialBuffer = paletteBuffer();
    const { palette } = parsePalette(initialBuffer);
    const buffer = serialisePalette(palette);

    assert.deepEqual(initialBuffer, buffer);
  });
});
