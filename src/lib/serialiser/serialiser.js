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
    this.#view.buffer.resize(this.#ptr + 1);
    this.#view.setUint8(this.#ptr++, value);
  }

  setUint16(value = 0x00) {
    this.#view.buffer.resize(this.#ptr + 2);
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

  get buffer() {
    return this.#view.buffer;
  }
}

export default Serialiser;
