// Overwrite part of a ROM with a buffer at a given offset.
const inject = (rom, buffer, offset = 0, length = 0) => {
  if (length === 0) {
    return rom;
  }

  const view = new DataView(rom);
  const bufferView = new DataView(buffer);

  if (buffer.byteLength > length) {
    console.warn(
      'Injected buffer is larger than allocated space. This may result in malfunctions.',
    );
  }

  let overwrites = false;
  for (let i = 0; i < buffer.byteLength; i++) {
    if (bufferView.getUint8(i) !== view.getUint8(offset + i)) {
      overwrites = true;
    }
    view.setUint8(offset + i, bufferView.getUint8(i));
  }

  if (overwrites) {
    console.log('Some values were overwritten.');
  }

  // Pad the rest of the allocated space with 0x00.
  for (let i = buffer.byteLength; i < length; i++) {
    view.setUint8(offset + i, 0xff);
  }

  return rom;
};

// prettier-ignore
const nesHeader = new Uint8Array([
  0x4e, 0x45, 0x53, 0x1a, // NES
  0x10, 0x00, 0x12, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
]);

// Append a NES header to a PRG buffer.
const prependNesHeader = (prg) => {
  const rom = new ArrayBuffer(nesHeader.length + prg.byteLength);
  const romView = new DataView(rom);
  const prgView = new DataView(prg);

  for (let i = 0; i < nesHeader.length; i++) {
    romView.setUint8(i, nesHeader[i]);
  }

  for (let i = nesHeader.length; i < rom.byteLength; i++) {
    romView.setUint8(i, prgView.getUint8(i - nesHeader.length));
  }

  return rom;
};

export { inject, prependNesHeader };
