import Serialiser from '../serialiser.js';

const serialiseRoomNametable = (nametable = {}) => {
  const serialiser = new Serialiser();
  const { tileset, palette, nametableObj } = nametable;

  serialiser.setUint8(tileset);

  for (let i = 0; i < 16; i++) {
    serialiser.setUint8(palette[i]);
  }

  for (let i = 0; i < 16; i++) {
    serialiseOneStrip(nametableObj[i].slice(2, 62), serialiser);
  }

  return serialiser.buffer;
};

// Serialise one strip using the compression algorithm.
const serialiseOneStrip = (nametableObj, serialiser) => {
  let n = 0;
  while (n < 60) {
    let initialTile = nametableObj[n];
    let loop = 0;

    // Look 2 tiles ahead.
    if (
      nametableObj[n] !== nametableObj[n + 1] ||
      nametableObj[n] !== nametableObj[n + 2]
    ) {
      // The next 3 tiles are different. Count how many unique tiles there are.
      // It stops once it encounters 3 identical tiles in a row.
      const initialN = n;

      do {
        loop++;
        initialTile = nametableObj[++n];
      } while (
        initialTile !== nametableObj[n + 1] ||
        initialTile !== nametableObj[n + 2]
      );

      serialiser.setUint8(loop | 0x80); // Set the type of loop.
      for (let i = initialN; i < n; i++) {
        serialiser.setUint8(nametableObj[i]);
      }
    } else {
      // The next 3 tiles are identical. Count how many of them in a row.
      // It stops when it finds a different tile.
      do {
        loop++;
      } while (initialTile === nametableObj[++n]);

      serialiser.setUint8(loop);
      serialiser.setUint8(initialTile);
    }
  }
};

export default serialiseRoomNametable;
