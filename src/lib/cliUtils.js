import { hex } from './utils.js';

const stringify = (signature, size, resources, res) => {
  resources.rooms.forEach((item) => {
    delete item.buffer;
  });
  resources.roomgfx.forEach((item) => delete item.buffer);
  resources.preps.forEach((item) => delete item.buffer);

  const data = {
    metadata: {
      crc32: `0x${hex(signature)}`,
      size,
      version: res.version,
      lang: res.lang,
    },
    resources,
  };

  return JSON.stringify(data, null, '  ');
};

export { stringify };
