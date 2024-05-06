#!/usr/bin/env node --experimental-json-modules

import { parseArgs } from 'node:util';
import { basename, extname } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { loadRom } from '../src/lib/cliUtils.js';
import serialisePreps from '../src/lib/serialiser/serialisePreps.js';
import { inject, prependNesHeader } from '../src/lib/inject.js';

/*
Modify prepositions experiment:
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
  console.log(`\x1b[1mModify prepositions experiment:\x1b[0m
  Inject different prepositions into a PRG or ROM file.
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

const newPreps = ['wo', 'ni', 'de', 'e'];
const prepBuffer = serialisePreps(newPreps);
const [offset, length] = res.preplist[0];

let nesHackRom = inject(rom, prepBuffer, offset, length);

const inputExtname = extname(values.input).toLowerCase();
if (inputExtname === '.prg') {
  nesHackRom = prependNesHeader(nesHackRom);
}

try {
  await writeFile(output, Buffer.from(nesHackRom));
} catch (err) {
  console.error(`Output ROM file could not be saved.`);
  console.error(err);
  process.exit(1);
}

console.log('Output file successfully written.');
