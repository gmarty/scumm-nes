import Parser from './parser';
import { decodeChar } from './utils';

const assert = console.assert;

const parsePreps = (arrayBuffer, i, offset = 0, characters = {}) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const preps = [];
  let charCode;
  let prep = '';

  for (let i = 0; i < arrayBuffer.byteLength; i++) {
    charCode = parser.getUint8();
    if (charCode === 0x00) {
      preps.push(prep);
      prep = '';
      continue;
    }

    prep += decodeChar(charCode, characters);
  }

  assert(charCode === 0x00, 'The final character is not 0x00.');

  return {
    metadata,
    preps,
  };
};

export default parsePreps;
