import Parser from './parser.js';

const assert = console.assert;

const parsePreps = (arrayBuffer, i = 0, offset = 0, characters = {}) => {
  const parser = new Parser(arrayBuffer, characters);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const preps = [];
  let char;
  let prep = '';

  for (let i = 0; i < parser.length; i++) {
    char = parser.getChar();
    if (char === 0x00) {
      preps.push(prep);
      prep = '';
      continue;
    }
    prep += char;
  }

  assert(char === 0x00, 'The final character is not 0x00.');

  return {
    metadata,
    preps,
  };
};

export default parsePreps;
