class Parser {
  #view;
  #ptr = 0;
  #characters = {};

  constructor(buffer, characters = {}) {
    this.#view = new DataView(buffer);
    this.#characters = characters;
  }

  getUint8() {
    return this.#view.getUint8(this.#ptr++);
  }

  getUint16() {
    const val = this.#view.getUint16(this.#ptr, true);
    this.#ptr += 2;
    return val;
  }

  getChar() {
    const charCode = this.getUint8();

    if (charCode === 0x00) {
      return 0x00;
    }

    const char = String.fromCodePoint(charCode);

    if (typeof this.#characters[char] !== 'undefined') {
      return this.#characters[char];
    }

    return char;
  }

  // Return the position of the next byte to read.
  get pointer() {
    return this.#ptr;
  }

  get length() {
    return this.#view.byteLength;
  }
}

export default Parser;
