import Serialiser from './Serialiser.js';

const serialisePalette = (palette = []) => {
  const serialiser = new Serialiser();

  for (let i = 0; i < 16; i++) {
    serialiser.setUint8(palette[i]);
  }

  return serialiser.buffer;
};

export default serialisePalette;
