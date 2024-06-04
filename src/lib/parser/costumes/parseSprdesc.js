import Parser from '../Parser.js';

const parseSprdesc = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const sprdesc = [];
  for (let i = 0; i < arrayBuffer.byteLength - 1; i += 2) {
    sprdesc.push(parser.getUint16());
  }

  // For some reason, the last element is a Uint8, probably unused.
  sprdesc.push(parser.getUint8());

  const map = {
    type: 'sprdesc',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    metadata,
    sprdesc,
    map,
  };
};

export default parseSprdesc;
