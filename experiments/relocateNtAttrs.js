#!/usr/bin/env node --experimental-json-modules

import { parseArgs } from 'node:util';
import { basename } from 'node:path';
import { loadRom, saveRom, expandRom, inject } from '../src/lib/cliUtils.js';
import parseRoom from '../src/lib/parser/parseRooms.js';
import { hex } from '../src/lib/utils.js';

/*
Relocate nametable and attributes:
  Move nametable and attributes out of the room payloads to a new section of the ROM.
  Update the NES ASM to read from the new location
  It creates a new ROM file called 'relocated-nt-attr.nes' in current path.
*/

const BANK_SIZE = 0x4000;
const output = 'relocated-nt-attr.nes';
const { values } = parseArgs({
  options: {
    input: {
      type: 'string',
      short: 'i',
    },
  },
  strict: true,
});

if (!values.input) {
  console.log(`\x1b[1mRelocate nametable and attributes:\x1b[0m
  Move nametable and attributes out of the room payloads to a new section of the ROM.
  Update the NES ASM to read from the new location
  It creates a new ROM file called '${output}' in current path.

\x1b[1mUsage\x1b[0m
  node ${basename(import.meta.url)} --input path/to/rom`);
  process.exit(0);
}

// Load the input file.
let rom, res;
try {
  ({ rom, res } = await loadRom(values.input));
} catch (err) {
  console.error(`Input ROM file could not be opened.`);
  console.error(err);
  process.exit(1);
}

rom = expandRom(rom);

// Write the nametable and attributes from bank 16 onwards.
const view = new DataView(rom);
const roomNum = 55;
let bank = 17;
let bankOffset = 0;
console.log('Bank:', bank);

for (let i = 0; i < roomNum; i++) {
  const [offset, length] = res.rooms[i];

  if (!length) {
    continue;
  }

  const roomBuffer = rom.slice(offset, offset + length);
  const resources = parseRoom(roomBuffer, i, offset, res.characters);
  let from, to;

  // Nametable
  ({ from, to } = resources.map.find(({ type }) => type === 'nametable'));
  const nametableLength = to - from;
  const nametableBuffer = roomBuffer.slice(from, to);
  for (let i = offset + from; i < offset + to; i++) {
    view.setUint8(i, 0xff);
  }

  // Attributes
  ({ from, to } = resources.map.find(({ type }) => type === 'attributes'));
  const attrsLength = to - from;
  const attrsBuffer = roomBuffer.slice(from, to);
  for (let i = offset + from; i < offset + to; i++) {
    view.setUint8(i, 0xff);
  }

  if (bankOffset + nametableLength + attrsLength > BANK_SIZE) {
    bank++;
    bankOffset = 0;
    console.log('Bank:', bank);
  }

  const ntOffset = bank * BANK_SIZE + bankOffset;
  const atOffset = ntOffset + nametableLength;
  inject(rom, nametableBuffer, ntOffset, nametableLength);
  inject(rom, attrsBuffer, atOffset, attrsLength);

  // Update room header.
  view.setUint16(offset + 0x08, bankOffset, true); // unk3
  view.setUint16(offset + 0x0c, bankOffset + nametableLength, true); // unk4
  view.setUint8(offset + 0x12, bank - 16); // unk5

  console.log(
    'Room %s: bank = 0x%s, nt offset = 0x%s, attrs offset = 0x%s',
    i,
    hex(bank - 16),
    hex(bankOffset),
    hex(bankOffset + nametableLength),
  );
  bankOffset += nametableLength;
  bankOffset += attrsLength;
}

try {
  await saveRom(output, rom);
} catch (err) {
  console.error(`Output ROM file could not be saved.`);
  console.error(err);
  process.exit(1);
}

console.log('Output file successfully written.');
