import parseRooms from '../lib/parseRooms';
import parseRoomGfx from '../lib/parseRoomGfx';
import parsePreps from './parsePreps';

const parseRom = (arrayBuffer, res) => {
  const rooms = [];
  const roomgfx = [];
  const preps = [];

  for (let i = 0; i < res?.rooms?.length; i++) {
    const [offset, length] = res.rooms[i];

    if (length === 0) {
      continue;
    }

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseRooms(buffer, i, offset, res.characters);
    item.buffer = buffer;
    rooms.push(item);
  }

  for (let i = 0; i < res?.roomgfx?.length; i++) {
    const [offset, length] = res.roomgfx[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseRoomGfx(buffer, i, offset);
    item.buffer = buffer;
    roomgfx.push(item);
  }

  for (let i = 0; i < res?.preplist?.length; i++) {
    const [offset, length] = res.preplist[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parsePreps(buffer, i, offset, res.characters);
    item.buffer = buffer;
    preps.push(item);
  }

  return {
    rooms,
    roomgfx,
    preps,
  };
};

export default parseRom;
