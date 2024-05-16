import parseScriptCode from './parseScriptCode.js';
import Parser from './parser.js';
const assert = console.assert;

const SIZEOF_BOX = 8;

const parseScript = (arrayBuffer, i, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  const chunkSize = parser.getUint16();

  assert(
    chunkSize === arrayBuffer.byteLength,
    'Script res size flag does not match chunk size.',
  );

  // const scriptBuffer = arrayBuffer.slice(4, 4 + arrayBuffer.length);
  parser.getUint8();
  parser.getUint8();

  const code = parseScriptCode(parser, 0x0004);

  return { metadata, code };
};

export default parseScript;
