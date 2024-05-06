import Serialiser from '../serialiser.js';
import { compress } from '../serialiserUtils.js';

const serialiseRoomAttributes = (attributes = [], width = 0) => {
  const serialiser = new Serialiser();

  const lineWidth = (width + 4) / 4; // 16 for 60px rooms, 8 for 28px rooms.
  for (let i = 0; i < 4; i++) {
    compress(serialiser, attributes.slice(i * 16, i * 16 + lineWidth));
  }

  return serialiser.buffer;
};

export default serialiseRoomAttributes;
