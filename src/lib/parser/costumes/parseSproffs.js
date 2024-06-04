import Parser from '../Parser.js';

const parseSproffs = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const sproffs = [];
  for (let i = 0; i < arrayBuffer.byteLength; i += 2) {
    sproffs.push(parser.getUint16());
  }

  const map = {
    type: 'sproffs',
    from: offset,
    to: offset + parser.pointer,
  };

  return {
    metadata,
    sproffs,
    map,
  };
};

export default parseSproffs;
