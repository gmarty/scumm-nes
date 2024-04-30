import Serialiser from '../serialiser.js';

const serialiseRoomMatrix = (matrix = []) => {
  const serialiser = new Serialiser();
  const boxNum = Math.sqrt(matrix.length);

  for (let i = 0; i < boxNum; i++) {
    serialiser.setUint8(i * boxNum);
  }

  for (let i = 0; i < boxNum * boxNum; i++) {
    serialiser.setUint8(matrix[i]);
  }

  return serialiser.buffer;
};

export default serialiseRoomMatrix;
