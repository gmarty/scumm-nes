import serialisePalette from './serialiser/serialisePalette.js';
import { hex } from './utils.js';

// Return true if an arrayBuffer has a NES header.
const hasNesHeader = (bin) => {
  const NES_HEADER = new Uint8Array([0x4e, 0x45, 0x53, 0x1a]);
  const view = new DataView(bin);
  for (let i = 0; i < NES_HEADER.length; i++) {
    if (view.getUint8(i) !== NES_HEADER[i]) {
      return false;
    }
  }
  return true;
};

const BANK_SIZE = 0x4000;

// Append a NES header to a PRG buffer.
const prependNesHeader = (prg) => {
  // prettier-ignore
  const NES_HEADER = new Uint8Array([
    0x4e, 0x45, 0x53, 0x1a, // NES
    0x10, 0x00, 0x12, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
  ]);

  const rom = new ArrayBuffer(NES_HEADER.length + prg.byteLength);
  const romView = new DataView(rom);
  const prgView = new DataView(prg);

  for (let i = 0; i < NES_HEADER.length; i++) {
    romView.setUint8(i, NES_HEADER[i]);
  }

  const banksNum = prg.byteLength / BANK_SIZE;
  romView.setUint16(4, banksNum, true); // Patch the NES header.

  for (let i = NES_HEADER.length; i < rom.byteLength; i++) {
    romView.setUint8(i, prgView.getUint8(i - NES_HEADER.length));
  }

  return rom;
};

// Overwrite part of a ROM with a buffer at a given offset.
// Return true if some data were overwritten.
const inject = (rom, buffer, offset = 0, length = null) => {
  if (buffer.byteLength === 0) {
    return false;
  }

  if (Number.isInteger(length) && buffer.byteLength > length) {
    console.warn(
      'Injected buffer is larger than allocated space. This may result in malfunctions.',
    );
  }

  const view = new DataView(rom);
  const bufferView = new DataView(buffer);
  let overwrites = false;

  for (let i = 0; i < buffer.byteLength; i++) {
    if (view.getUint8(offset + i) !== bufferView.getUint8(i)) {
      view.setUint8(offset + i, bufferView.getUint8(i));
      overwrites = true;
    }
  }

  if (Number.isInteger(length)) {
    // Pad the rest of the allocated space with 0xff.
    for (let i = buffer.byteLength; i < length; i++) {
      if (view.getUint8(offset + i) !== 0xff) {
        view.setUint8(offset + i, 0xff);
        overwrites = true;
      }
    }
  }

  return overwrites;
};

// Return a string representation of a buffer for debugging purposes.
const debugArrayBuffer = (buffer) => {
  const view = new DataView(buffer);
  const s = [`Length: ${buffer.byteLength} <`];

  for (let i = 0; i < buffer.byteLength; i++) {
    s.push(hex(view.getUint8(i)));
  }
  if (!buffer.byteLength) {
    s.push('empty buffer');
  }

  s.push(`>`);

  return s.join(' ');
};

// Inject the new content into the PRG and return a NES ROM buffer.
const generateRomHackFile = (prg, resources) => {
  const screens = [...resources.titles, ...resources.rooms];

  // Update screen titles and rooms palette.
  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
    const { offset, size, id } = screen.metadata;
    if (!size) {
      continue;
    }

    const { from, to } = screen.map.find(({ type }) => type === 'palette');
    const buffer = serialisePalette(screen.palette);

    const overwrites = inject(prg, buffer, offset + from, to - from);
    if (overwrites) {
      console.log('Injecting screen %i palette', id);
    }
  }

  // Add the iNES header to make it playable on emulators.
  return prependNesHeader(prg);
};

export {
  hasNesHeader,
  prependNesHeader,
  inject,
  debugArrayBuffer,
  generateRomHackFile,
};
