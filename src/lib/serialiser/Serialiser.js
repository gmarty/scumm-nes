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
