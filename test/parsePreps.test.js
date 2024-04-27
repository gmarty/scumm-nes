import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import parsePreps from '../src/lib/parser/parsePreps.js';
import serialisePreps from '../src/lib/serialiser/serialisePreps.js';

describe('parsePreps', () => {
  it('should set the offset value in metadata.', () => {
    const buffer = new ArrayBuffer(6);
    const { metadata } = parsePreps(buffer, 0, 0xabc);
    assert.equal(metadata.offset, 0xabc);
  });

  it('should set the buffer size in metadata.', () => {
    const buffer = new ArrayBuffer(6);
    const { metadata } = parsePreps(buffer);
    assert.equal(metadata.size, 6);
  });

  it('should parse prepositions.', () => {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint8(0, 'a'.codePointAt(0));
    view.setUint8(1, 0x00);
    view.setUint8(2, 'b'.codePointAt(0));
    view.setUint8(3, 0x00);
    view.setUint8(4, 'c'.codePointAt(0));
    view.setUint8(5, 0x00);

    const { preps } = parsePreps(buffer);
    assert.deepEqual(preps, ['a', 'b', 'c']);
  });

  it('should parse characters according to the character mapping.', () => {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);
    view.setUint8(0, 'a'.codePointAt(0));
    view.setUint8(1, 0x00);
    view.setUint8(2, 'b'.codePointAt(0));
    view.setUint8(3, 0x00);
    view.setUint8(4, 'c'.codePointAt(0));
    view.setUint8(5, 0x00);

    const characters = { a: '0', b: '1', c: '2' };
    const { preps } = parsePreps(buffer, 0, 0, characters);
    assert.deepEqual(preps, ['0', '1', '2']);
  });

  it('should be the inverse of serialisePreps.', () => {
    const initialBuffer = new ArrayBuffer(6);
    const view = new DataView(initialBuffer);
    view.setUint8(0, 'a'.codePointAt(0));
    view.setUint8(2, 'b'.codePointAt(0));
    view.setUint8(4, 'c'.codePointAt(0));
    const { preps } = parsePreps(initialBuffer);
    const buffer = serialisePreps(preps);

    assert.deepEqual(initialBuffer, buffer);
  });
});
