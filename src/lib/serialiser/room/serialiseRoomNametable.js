import Serialiser from '../Serialiser.js';

const serialiseRoomNametable = (nametable = []) => {
  const serialiser = new Serialiser();

  for (let i = 0; i < nametable.length; i++) {
    serialiser.compressArray(nametable[i].slice(2, 62));
  }

  return serialiser.buffer;
};

export default serialiseRoomNametable;
