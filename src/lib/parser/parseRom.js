import parseRooms from './parseRooms.js';
import parseRoomGfx from './parseRoomGfx.js';
import parseGlobdata from './parseGlobdata.js';
import parseScript from './parseScript.js';
import parseCostumeGfx from './sprites/parseCostumeGfx.js';
import parseCostumes from './sprites/parseCostumes.js';
import parseSprpals from './sprites/parseSprpals.js';
import parseSprdesc from './sprites/parseSprdesc.js';
import parseSprlens from './sprites/parseSprlens.js';
import parseSproffs from './sprites/parseSproffs.js';
import parseSprdata from './sprites/parseSprdata.js';
import parsePreps from './parsePreps.js';
import parseTitles from './parseTitles.js';

const parseRom = (arrayBuffer, res) => {
  const rooms = [];
  const roomgfx = [];
  const globdata = [];
  const scripts = [];
  const costumegfx = [];
  const costumes = [];
  const sprpals = [];
  const sprdesc = [];
  const sprlens = [];
  const sproffs = [];
  const sprdata = [];
  const preps = [];
  const titles = [];

  for (let i = 0; i < res?.rooms?.length; i++) {
    const [offset, length] = res.rooms[i];

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

  for (let i = 0; i < res?.globdata?.length; i++) {
    const [offset, length] = res.globdata[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseGlobdata(buffer, i, offset);
    item.buffer = buffer;
    globdata.push(item);
  }

  for (let i = 0; i < res.scripts.length; i++) {
    const [offset, length] = res.scripts[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseScript(buffer, i, offset, res.characters);
    item.buffer = buffer;
    scripts.push(item);
  }

  for (let i = 0; i < res.costumes.length; i++) {
    const [offset, length] = res.costumes[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseCostumes(buffer, i, offset);
    item.buffer = buffer;
    costumes.push(item);
  }

  for (let i = 0; i < res.costumegfx.length; i++) {
    const [offset, length] = res.costumegfx[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseCostumeGfx(buffer, i, offset);
    item.buffer = buffer;
    costumegfx.push(item);
  }

  for (let i = 0; i < res.sprpals.length; i++) {
    const [offset, length] = res.sprpals[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprpals(buffer, i, offset);
    item.buffer = buffer;
    sprpals.push(item);
  }

  for (let i = 0; i < res.sprdesc.length; i++) {
    const [offset, length] = res.sprdesc[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprdesc(buffer, i, offset);
    item.buffer = buffer;
    sprdesc.push(item);
  }

  for (let i = 0; i < res.sprlens.length; i++) {
    const [offset, length] = res.sprlens[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprlens(buffer, i, offset);
    item.buffer = buffer;
    sprlens.push(item);
  }

  for (let i = 0; i < res.sproffs.length; i++) {
    const [offset, length] = res.sproffs[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSproffs(buffer, i, offset);
    item.buffer = buffer;
    sproffs.push(item);
  }

  // @todo Assert that the highest value of sprdesc is within sprlens and sproffs.
  // @todo Assert that sprlens and sproffs have the same length.

  for (let i = 0; i < res.sprdata.length; i++) {
    const [offset, length] = res.sprdata[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parseSprdata(buffer, i, offset);
    item.buffer = buffer;
    sprdata.push(item);
  }

  // @todo Assert that the highest value of sproffs is within sprdata.

  console.log(costumegfx);
  console.log(costumes);
  console.log(sprpals);
  console.log(sprdesc);
  console.log(sprlens);
  console.log(sproffs);
  console.log(sprdata);

  for (let i = 0; i < res?.preplist?.length; i++) {
    const [offset, length] = res.preplist[i];

    const buffer = arrayBuffer.slice(offset, offset + length);
    const item = parsePreps(buffer, i, offset, res.characters);
    item.buffer = buffer;
    preps.push(item);
  }

  // The title screens are stored outside of SCUMM.
  for (let i = 0; i < res?.titles?.length; i++) {
    const [offset] = res.titles[i];

    // @todo Figure out the length of the title chunks.
    const buffer = arrayBuffer.slice(offset); //, offset + length);
    const item = parseTitles(buffer, i, offset);
    item.buffer = buffer;
    titles.push(item);
  }

  return {
    rooms,
    roomgfx,
    globdata,
    scripts,
    costumes,
    sprpals,
    sprdesc,
    sprlens,
    sproffs,
    sprdata,
    preps,
    titles,
  };
};

export default parseRom;
