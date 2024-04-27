#!/usr/bin/env node --experimental-json-modules

import { parseArgs } from 'node:util';
import { basename, extname } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import crc32 from '../src/lib/crc32.js';
import { getResFromCrc32 } from '../src/lib/getResFromCrc32.js';
import serialisePreps from '../src/lib/serialiser/serialisePreps.js';
import { inject, prependNesHeader } from '../src/lib/inject.js';

/*
Update prepositions experiment:
  Inject different prepositions into a PRG or ROM file.
  It creates a new ROM file called 'experiment-preps.nes' in current path.
*/

const output = 'experiment-preps.nes';
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
  console.log(`\x1b[1mUpdate prepositions experiment:\x1b[0m
  Inject different prepositions into a PRG or ROM file.
  It creates a new ROM file called '${output}' in current path.

\x1b[1mUsage\x1b[0m
  node ${basename(import.meta.url)} --input path/to/rom
`);
  process.exit(0);
}

// Load the input file.
const romPath = values.input;
let rom;
try {
  rom = await readFile(romPath);
} catch (e) {
  console.error(`Error opening input file '${romPath}'.`);
  process.exit(1);
}

const dataView = new DataView(rom.buffer);
const signature = crc32(dataView);
const res = getResFromCrc32(signature);

const newPreps = ['wo', 'ni', 'de', 'e'];
const prepBuffer = serialisePreps(newPreps);
const [offset, length] = res.preplist[0];

let nesHackRom = inject(rom.buffer, prepBuffer, offset, length);

const inputExtname = extname(values.input).toLowerCase();
if (inputExtname === '.prg') {
  nesHackRom = prependNesHeader(nesHackRom);
}

try {
  await writeFile(output, Buffer.from(nesHackRom));
  console.log('Output file successfully written.');
} catch (e) {
  console.error(`Error writing output file '${output}'.`, e);
}
