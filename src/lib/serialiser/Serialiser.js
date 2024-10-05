const maxByteLength = 16384; // The largest resource is sprdata.

class Serialiser {
  #view;
  #ptr = 0;
  #characters = {};

  constructor(characters = {}) {
    const buffer = new ArrayBuffer(0, { maxByteLength });
    this.#view = new DataView(buffer);
    // Swap keys for values.
    this.#characters = Object.fromEntries(
      Object.entries(characters).map(([key, value]) => [value, key]),
    );
  }

  setUint8(value = 0x00) {
    this.#resize(this.#ptr + 1);
    this.#view.setUint8(this.#ptr++, value);
  }

  setUint16(value = 0x00) {
    this.#resize(this.#ptr + 2);
    this.#view.setUint16(this.#ptr, value, true);
    this.#ptr += 2;
  }

  setString(str) {
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt#looping_with_codepointat
    for (let codePoint of str) {
      if (this.#characters[codePoint] !== undefined) {
        codePoint = this.#characters[codePoint];
      }
      this.setUint8(codePoint.codePointAt(0));
    }
  }

  // Compress an array of data using the RLE compression algorithm.
  compressArray(data) {
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

        this.setUint8(loop | 0x80); // Set the type of loop.
        for (let i = initialN; i < n; i++) {
          this.setUint8(data[i]);
        }
      } else {
        // The next 3 tiles are identical. Count how many of them in a row.
        // It stops when it finds a different tile.
        do {
          loop++;
        } while (initialValue === data[++n]);

        this.setUint8(loop);
        this.setUint8(initialValue);
      }
    }
  }

  // Firefox doesn't support ArrayBuffer#resize.
  #resize(newByteLength) {
    if (ArrayBuffer.prototype.resize) {
      this.#view.buffer.resize(newByteLength);
      return;
    }

    const newArrayBuffer = new ArrayBuffer(newByteLength);
    const view = new DataView(newArrayBuffer);
    for (let i = 0; i < this.#view.buffer.byteLength; i++) {
      view.setUint8(i, this.#view.getUint8(i));
    }
    this.#view = view;
  }

  get buffer() {
    return this.#view.buffer;
  }
}

export default Serialiser;
