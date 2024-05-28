import Serialiser from './Serialiser.js';

const serialisePreps = (preps = [], characters = {}) => {
  const serialiser = new Serialiser(characters);

  for (let i = 0; i < preps.length; i++) {
    serialiser.setString(preps[i]);
    serialiser.setUint8(); // 0x00 is the default value.
  }

  return serialiser.buffer;
};

export default serialisePreps;
