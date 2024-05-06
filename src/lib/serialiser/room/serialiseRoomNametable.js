import Serialiser from '../serialiser.js';
import { compress } from '../serialiserUtils.js';

const serialiseRoomNametable = (nametable = {}) => {
  const serialiser = new Serialiser();
  const { tileset, palette, nametableObj } = nametable;

  serialiser.setUint8(tileset);

  for (let i = 0; i < 16; i++) {
    serialiser.setUint8(palette[i]);
  }

  for (let i = 0; i < nametableObj.length; i++) {
    compress(serialiser, nametableObj[i].slice(2, 62));
  }

  return serialiser.buffer;
};

export default serialiseRoomNametable;
