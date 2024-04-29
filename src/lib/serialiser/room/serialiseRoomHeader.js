import Serialiser from '../serialiser.js';

const serialiseRoomHeader = (header) => {
  const serialiser = new Serialiser();

  // @todo Move the writing of chunk size outside of this code,
  //   to the end of the serialisation.
  serialiser.setUint16(header.chunkSize);

  serialiser.setUint8(header.unk1);
  serialiser.setUint8(header.unk2);

  serialiser.setUint16(header.width);
  serialiser.setUint16(header.height);

  serialiser.setUint16(); // 0x00

  serialiser.setUint16(header.nametableOffs);
  serialiser.setUint16(header.attrOffs);
  serialiser.setUint16(header.maskOffs);

  serialiser.setUint16(header.unk4);
  serialiser.setUint16(header.unk5);

  // @todo Update the value of objectsNum after the serialisation.
  serialiser.setUint8(header.objectsNum);

  serialiser.setUint8(header.boxOffs);
  serialiser.setUint8(header.soundsNum);

  serialiser.setUint8(header.scriptsNum);
  serialiser.setUint16(header.excdOffs);
  serialiser.setUint16(header.encdOffs);

  return serialiser.buffer;
};

export default serialiseRoomHeader;
