#!/usr/bin/env node --experimental-json-modules

import { parseArgs } from 'node:util';
import { basename } from 'node:path';
import { loadRom, saveRom, expandRom } from '../src/lib/cliUtils.js';

/*
Double the ROM size:
  Add 256k of blank memory to the ROM and update the header.
  It creates a new ROM file called 'rom-expanded.nes' in current path.
*/

const output = 'rom-expanded.nes';
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
  console.log(`\x1b[1mDouble the ROM size:\x1b[0m
  Add 256k of blank memory to the ROM and update the header.
  It creates a new ROM file called '${output}' in current path.

\x1b[1mUsage\x1b[0m
  node ${basename(import.meta.url)} --input path/to/rom`);
  process.exit(0);
}

// Load the input file.
let rom;
try {
  ({ rom } = await loadRom(values.input));
} catch (err) {
  console.error(`Input ROM file could not be opened.`);
  console.error(err);
  process.exit(1);
}

rom = expandRom(rom);

try {
  await saveRom(output, rom);
} catch (err) {
  console.error(`Output ROM file could not be saved.`);
  console.error(err);
  process.exit(1);
}

console.log('Output file successfully written.');
