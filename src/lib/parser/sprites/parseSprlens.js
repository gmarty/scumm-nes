import Parser from '../Parser.js';

const parseSprlens = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const sprlens = [];
  for (let i = 0; i < arrayBuffer.byteLength; i++) {
    sprlens.push(parser.getUint8() + 1);
  }

  const map = {
    type: 'sprlens',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    metadata,
    sprlens,
    map,
  };
};

export default parseSprlens;
