import Parser from './parser.js';

const parseGlobdata = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const globdata = [];

  for (let i = 0; i < parser.length; i++) {
    globdata.push(parser.getUint8());
  }

  return {
    metadata,
    globdata,
  };
};

export default parseGlobdata;
