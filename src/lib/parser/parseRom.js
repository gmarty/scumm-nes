import parseRooms from './parseRooms.js';
import parseRoomGfx from './parseRoomGfx.js';
import parseGlobdata from './parseGlobdata.js';
import parsePreps from './parsePreps.js';
import parseScripts from './parseScripts.js';

const parseRom = (arrayBuffer, res) => {
  const rooms = [];
  const roomgfx = [];
  const globdata = [];
  const scripts = [];
  const preps = [];
  let objects = [];

  for (let i = 0; i < res?.rooms?.length; i++) {
    const [offset, length] = res.rooms[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseRooms(buffer, i, offset, res.characters);
    item.buffer = buffer;
    rooms.push(item);

    if (item.objects !== undefined) {
      objects = objects.concat(item.objects);
    }
  }

  for (let i = 0; i < res?.roomgfx?.length; i++) {
    const [offset, length] = res.roomgfx[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseRoomGfx(buffer, i, offset);
    item.buffer = buffer;
    roomgfx.push(item);
  }

  for (let i = 0; i < res?.globdata?.length; i++) {
    const [offset, length] = res.globdata[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseGlobdata(buffer, i, offset);
    item.buffer = buffer;
    globdata.push(item);
  }

  for (let i = 0; i < res.scripts.length; i++) {
    const [offset, length] = res.scripts[i];
    if (length === 0) {
      console.log(`Script ${i}`, 'Skipping 0-length resource.');
      continue;
    }

    const resBuffer = arrayBuffer.slice(offset, offset + length);
    const script = parseScripts(resBuffer, i, offset);

    scripts.push(script);
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
    globdata,
    preps,
    scripts,
    objects,
  };
};

export default parseRom;
