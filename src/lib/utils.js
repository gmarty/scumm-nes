const zeroPad = (s, len = 2) => {
  return String(s).padStart(len, '0');
};

const hex = (n, len = 2) => {
  const str = n.toString(16);
  const l = Math.ceil(str.length / 2) * 2; // Even number of 0s.
  return zeroPad(str, Math.max(len, l));
};

const formatBytes = (bytes, decimals = 2) => {
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  if (bytes === 0 || i === 0) {
    return `${bytes} ${sizes[0]}`;
  }

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
};

const formatPercentage = (percent, decimals = 2) => {
  const dm = decimals < 0 ? 0 : decimals;
  return `${(percent * 100).toFixed(dm)}%`;
};

// Return true if an arrayBuffer has a NES header.
const hasNesHeader = (bin) => {
  const NES_HEADER = new Uint8Array([0x4e, 0x45, 0x53, 0x1a]);
  const view = new DataView(bin);
  for (let i = 0; i < NES_HEADER.length; i++) {
    if (view.getUint8(i) !== NES_HEADER[i]) {
      return false;
    }
  }
  return true;
};

export { zeroPad, hex, formatBytes, formatPercentage, hasNesHeader };
