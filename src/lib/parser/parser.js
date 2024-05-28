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

  getString() {
    let str = '';
    let charCode;
    do {
      charCode = this.getUint8();

      if (charCode === 0x00) {
        break;
      }

      const flag = (charCode & 0x80) !== 0;
      charCode &= 0x7f;

      if (charCode < 8) {
        switch (charCode) {
          case 1:
            // Line break
            str += '<01>\n';
            break;
          case 2:
            // Do not clear the text with the next `printEgo` call?
            str += '<02>';
            break;
          case 3:
            // New line
            str += '<03>\n';
            break;
          case 4:
            // Used only in the address sign.
            str += `<Var[${this.getUint8()}]>`;
            break;
          case 0:
          case 5:
          case 6:
          case 7:
            throw new Error(`Unknown escape code ${charCode}.`);
          default:
            break;
        }

        continue;
      }

      let char = String.fromCodePoint(charCode);

      if (typeof this.#characters[char] === 'string') {
        char = this.#characters[char];
      }

      str += char;

      if (flag) {
        str += ' ';
      }
    } while (true);

    return str;
  }

  peekUint8() {
    return this.#view.getUint8(this.#ptr);
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
