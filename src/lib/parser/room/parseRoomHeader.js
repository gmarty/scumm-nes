import Parser from '../parser.js';

const assert = console.assert;

const parseRoomHeader = (arrayBuffer) => {
  const parser = new Parser(arrayBuffer);

  const chunkSize = parser.getUint16(); // Room res size

  const unk1 = parser.getUint8();
  const unk2 = parser.getUint8();

  assert(unk1 === 0, 'Unknown 1 is not 0.');

  const width = parser.getUint16(); // Room width
  const height = parser.getUint16(); // Room height

  assert(width === 28 || width === 60, 'Room width is not 28 or 60.');
  assert(height === 16, 'Room height is not 16.');

  const unk3 = parser.getUint16(); // Number objects in room (unused?)

  assert(unk3 === 0, 'Unknown 3 is not 0.');

  const nametableOffs = parser.getUint16(); // Gfx background tileset offset
  const attrOffs = parser.getUint16(); // Gfx background attr offset
  const maskOffs = parser.getUint16(); // Gfx mask offset

  const unk4 = parser.getUint16(); // charMap offset
  const unk5 = parser.getUint16(); // picMap offset

  assert(unk4 === unk5, 'The values of unknown 4 and 5 do not match.');

  const objectsNum = parser.getUint8();

  assert(objectsNum < 57, 'There are more than 56 objects in room.');

  const boxOffs = parser.getUint8();
  const soundsNum = parser.getUint8();

  assert(soundsNum === 0, 'The number of sounds is not 0.');

  const scriptsNum = parser.getUint8();
  const excdOffs = parser.getUint16(); // Exit script (EXCD) offset
  const encdOffs = parser.getUint16(); // Entry script (ENCD) offset

  const headerMap = {
    type: 'header',
    from: 0x00,
    to: 0x1c,
  };

  const header = {
    chunkSize,
    unk1,
    unk2,
    width,
    height,
    unk3,
    nametableOffs,
    attrOffs,
    maskOffs,
    unk4,
    unk5,
    objectsNum,
    boxOffs,
    soundsNum,
    scriptsNum,
    excdOffs,
    encdOffs,
  };

  return { headerMap, header };
};

export default parseRoomHeader;
