// Compress an array of data using the RLE compression algorithm.
const compress = (serialiser, data) => {
  let n = 0;
  while (n < data.length) {
    let initialValue = data[n];
    let loop = 0;

    // Look 2 tiles ahead.
    if (data[n] !== data[n + 1] || data[n] !== data[n + 2]) {
      // The next 3 tiles are different. Count how many unique tiles there are.
      // It stops once it encounters 3 identical tiles in a row.
      const initialN = n;

      do {
        loop++;
        initialValue = data[++n];
      } while (initialValue !== data[n + 1] || initialValue !== data[n + 2]);

      serialiser.setUint8(loop | 0x80); // Set the type of loop.
      for (let i = initialN; i < n; i++) {
        serialiser.setUint8(data[i]);
      }
    } else {
      // The next 3 tiles are identical. Count how many of them in a row.
      // It stops when it finds a different tile.
      do {
        loop++;
      } while (initialValue === data[++n]);

      serialiser.setUint8(loop);
      serialiser.setUint8(initialValue);
    }
  }
};

export { compress };
