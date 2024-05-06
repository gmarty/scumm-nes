#!/usr/bin/env node --experimental-json-modules

import { parseArgs } from 'node:util';
import { basename, extname } from 'node:path';
import { open, writeFile } from 'node:fs/promises';
import pkg from './package.json' with { type: 'json' };
import { loadRom } from './src/lib/cliUtils.js';
import parseRom from './src/lib/parser/parseRom.js';
import { stringify } from './src/lib/cliUtils.js';

const options = {
  version: {
    type: 'boolean',
    short: 'v',
    default: false,
  },
  help: {
    type: 'boolean',
    short: 'h',
    default: false,
  },
  input: {
    type: 'string',
    short: 'i',
  },
  output: {
    type: 'string',
    short: 'o',
  },
};

const { values } = parseArgs({
  options,
  strict: true,
});

if (values.version) {
  const { version } = pkg;
  // See https://www.gnu.org/prep/standards/html_node/_002d_002dversion.html
  console.log(`scumm-nes ${version}`);
  process.exit(0);
}

if (values.help || (!values.input && !values.output)) {
  const { description, version, bugs, homepage } = pkg;

  // See https://www.gnu.org/prep/standards/html_node/_002d_002dhelp.html
  console.log(`\x1b[1mDescription\x1b[0m
  ${description} [version ${version}]

\x1b[1mSynopsis\x1b[0m
  This CLI exports the parsed resources of a ROM or PRG to JSON.

\x1b[1mUsage\x1b[0m
  node ${basename(import.meta.url)} --input path/to/rom --output resources.json

\x1b[1mOptions\x1b[0m
  --input, -i    Path to a ROM or PRG file.
  --output, -o   Path to a JSON filename to be created.
  --version, -v  Print the version number.

Report bugs to: <\x1b[1m${bugs.url || bugs}\x1b[0m>
Home page: <\x1b[1m${homepage}\x1b[0m>`);
  process.exit(0);
}

if (!values.input && !values.output) {
  console.error(
    'The \x1b[1m--input\x1b[0m and \x1b[1m--output\x1b[0m arguments are required.',
  );
  process.exit(1);
}
if (!values.input) {
  console.error('The \x1b[1m--input\x1b[0m argument is required.');
  process.exit(1);
}
if (!values.output) {
  console.error('The \x1b[1m--output\x1b[0m argument is required.');
  process.exit(1);
}

const inputExtname = extname(values.input).toLowerCase();
if (inputExtname !== '.prg' && inputExtname !== '.nes') {
  console.error('Only PRG and NES files are accepted.');
  process.exit(1);
}
const outputExtname = extname(values.output).toLowerCase();
if (outputExtname !== '.json') {
  console.error(
    'Specify a \x1b[1m.json\x1b[0m file for the \x1b[1m--output\x1b[0m argument.',
  );
  process.exit(1);
}

// Check that the output file does not already exist.
let outputFileExists = null;
try {
  await open(values.output);
  outputFileExists = true;
} catch (e) {
  outputFileExists = false;
}
if (outputFileExists) {
  console.error(`File '${values.output}' already exists.`);
  process.exit(1);
}

// Load the input file.
let rom, res, hash;
try {
  ({ rom, res, hash } = await loadRom(values.input));
} catch (err) {
  console.error(`Input ROM file could not be opened.`);
  console.error(err);
  process.exit(1);
}

const resources = parseRom(rom, res);
const content = stringify(hash, rom.byteLength, resources, res);

try {
  await writeFile(values.output, content, { encoding: 'utf-8' });
} catch (err) {
  console.error(`Error writing output file '${values.output}'.`);
  console.error(err);
  process.exit(1);
}

console.log('Output file successfully written.');
