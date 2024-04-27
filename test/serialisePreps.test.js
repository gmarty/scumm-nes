import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import serialisePreps from '../src/lib/serialiser/serialisePreps.js';
import parsePreps from '../src/lib/parser/parsePreps.js';

describe('serialisePreps', () => {
  it('should return an instance of ArrayBuffer.', () => {
    const buffer = serialisePreps();
    assert.ok(buffer instanceof ArrayBuffer);
  });

  it('should serialise prepositions.', () => {
    const preps = ['a', 'b', 'c'];
    const buffer = serialisePreps(preps);
    const view = new DataView(buffer);

    assert.equal(view.getUint8(0), 0x61);
    assert.equal(view.getUint8(1), 0x00);
    assert.equal(view.getUint8(2), 0x62);
    assert.equal(view.getUint8(3), 0x00);
    assert.equal(view.getUint8(4), 0x63);
    assert.equal(view.getUint8(5), 0x00);
  });

  it('should serialise characters according to the character mapping.', () => {
    const preps = ['0', '1', '2'];
    const characters = { a: '0', b: '1', c: '2' };
    const buffer = serialisePreps(preps, characters);

    const view = new DataView(buffer);
    assert.equal(view.getUint8(0), 0x61);
    assert.equal(view.getUint8(1), 0x00);
    assert.equal(view.getUint8(2), 0x62);
    assert.equal(view.getUint8(3), 0x00);
    assert.equal(view.getUint8(4), 0x63);
    assert.equal(view.getUint8(5), 0x00);
  });

  it('should be the inverse of parsePreps.', () => {
    const initialPreps = ['a', 'b', 'c'];
    const buffer = serialisePreps(initialPreps);
    const { preps } = parsePreps(buffer);

    assert.deepEqual(initialPreps, preps);
  });
});
