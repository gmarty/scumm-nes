import Parser from '../Parser.js';

const parseCostumes = (arrayBuffer, i = 0, offset = 0) => {
  const parser = new Parser(arrayBuffer);
  const metadata = {
    id: i,
    offset,
    size: arrayBuffer.byteLength,
    decompressedSize: 0,
  };

  const costumes = [];
  let to = 0;
  for (let i = 0; i < 24; i++) {
    const offset = parser.getUint8();
    const length = parser.getUint8();
    const costumeParser = new Parser(
      arrayBuffer.slice(offset, offset + length),
    );
    to = Math.max(to, offset + length);
    const costume = [];
    for (let j = 0; j < length; j++) {
      costume.push(costumeParser.getUint8());
    }
    costumes.push(costume);
  }

  metadata.decompressedSize = costumes.length;

  const map = {
    type: 'costumes',
    from: offset,
    to: offset + to,
  };

  return {
    metadata,
    costumes,
    map,
  };
};

export default parseCostumes;
