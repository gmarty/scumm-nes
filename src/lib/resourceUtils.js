const computeResourceSizes = (rom, res) => {
  const paddingSize = getPaddingSize(rom);
  const romSize = rom.byteLength;
  const entries = [];
  let nonResourceSize = romSize;

  Object.entries(res).forEach(([label, resource]) => {
    if (!Array.isArray(resource)) {
      return;
    }

    const size = resource.reduce((a, b) => a + b[1], 0);
    const percentage = size / romSize;
    entries.push({
      label,
      size,
      percentage,
    });
    nonResourceSize -= size;
  });

  entries.push({
    label: 'padding',
    size: paddingSize,
    percentage: paddingSize / romSize,
  });

  entries.push({
    label: 'other',
    size: nonResourceSize - paddingSize,
    percentage: (nonResourceSize - paddingSize) / romSize,
  });

  entries.sort((a, b) => b.size - a.size);

  return entries;
};

// @todo Exclude the resources here.
const getPaddingSize = (rom) => {
  const view = new DataView(rom);
  let paddingSize = 0;
  for (let j = 0; j < rom.byteLength; j += 4) {
    if (
      view.getUint8(j) === 0xff &&
      view.getUint8(j + 1) === 0xff &&
      view.getUint8(j + 2) === 0xff &&
      view.getUint8(j + 3) === 0xff
    ) {
      paddingSize += 4;
    }
  }
  return paddingSize;
};

// Returns a colour string to be displayed in a range.
const getResourceColour = (step = 0, steps = 0) =>
  `oklch(${60 + (step % 2 ? 0 : 30)}% ${
    0.15 + (step % 2 ? 0.05 : 0)
  } ${(360 / steps) * step})`;

export { computeResourceSizes, getResourceColour };
