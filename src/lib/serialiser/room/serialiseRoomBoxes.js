import Serialiser from '../serialiser.js';

const serialiseRoomBoxes = (boxes = []) => {
  const serialiser = new Serialiser();

  serialiser.setUint8(boxes.length);
  for (let i = 0; i < boxes.length; i++) {
    const { uy, ly, ulx, urx, llx, lrx, mask, flags } = boxes[i];
    serialiser.setUint8(uy);
    serialiser.setUint8(ly);
    serialiser.setUint8(ulx);
    serialiser.setUint8(urx);
    serialiser.setUint8(llx);
    serialiser.setUint8(lrx);
    serialiser.setUint8(mask);
    serialiser.setUint8(flags);
  }

  return serialiser.buffer;
};

export default serialiseRoomBoxes;
