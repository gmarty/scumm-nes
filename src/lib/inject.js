// Overwrite part of a ROM with a buffer at a given offset.
const inject = (rom, buffer, offset = 0, length = 0) => {
  const view = new DataView(rom);
  const bufferView = new DataView(buffer);

  if (buffer.byteLength > length && length > 0) {
    console.warn(
      'Injected buffer is larger than allocated space. This may result in malfunctions.',
    );
  }

  for (let i = 0; i < buffer.byteLength; i++) {
    view.setUint8(offset + i, bufferView.getUint8(i));
  }

  if (length > 0) {
    // Pad the rest of the allocated space with 0x00.
    for (let i = buffer.byteLength; i < length; i++) {
      view.setUint8(offset + i, 0xff);
    }
  }

  return rom;
};

// prettier-ignore
const header = new Uint8Array([
  0x4e, 0x45, 0x53, 0x1a,
  0x10, 0x00, 0x12, 0x00,
  0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00,
]);

// Append a NES header to a PRG buffer.
const prependNesHeader = (prg) => {
  const rom = new ArrayBuffer(header.length + prg.byteLength);
  const romView = new DataView(rom);
  const prgView = new DataView(prg);

  for (let i = 0; i < header.length; i++) {
    romView.setUint8(i, header[i]);
  }

  for (let i = header.length; i < rom.byteLength; i++) {
    romView.setUint8(i, prgView.getUint8(i - header.length));
  }

  return rom;
};

export { inject, prependNesHeader };
