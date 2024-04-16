class Parser {
  #view;
  #ptr = 0;

  constructor(arrayBuffer) {
    this.#view = new DataView(arrayBuffer);
  }

  getUint8() {
    return this.#view.getUint8(this.#ptr++);
  }

  getUint16() {
    const val = this.#view.getUint16(this.#ptr, true);
    this.#ptr += 2;
    return val;
  }

  // Return the position of the next byte to read.
  // @todo Return the last read character's instead.
  get pointer() {
    return this.#ptr;
  }
}

export default Parser;
