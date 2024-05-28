import parseScriptCode from './parseScriptCode.js';
import Parser from './parser.js';
const assert = console.assert;

const parseScript = (arrayBuffer, i, offset = 0, characters = {}) => {
  const parser = new Parser(arrayBuffer, characters);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
  };

  if (arrayBuffer.byteLength === 0) {
    return { metadata, header: {}, code: [] };
  }

  const chunkSize = parser.getUint16();
  const unk1 = parser.getUint8();
  const unk2 = parser.getUint8();

  assert(
    chunkSize === arrayBuffer.byteLength,
    'Script res size flag does not match chunk size.',
  );

  assert(unk1 === 0, 'Unknown 1 is not 0.');

  const header = {
    chunkSize,
    unk1,
    unk2,
  };

  // Skip script 59 and 90 as they seem to be corrupted
  if (i === 0x3b || i === 0x5a) {
    return { metadata, header, code: [] };
  }

  const code = parseScriptCode(parser, 0x0004);

  return { metadata, header, code };
};

export default parseScript;
