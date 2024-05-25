const zeroPad = (s, len = 2) => {
  return String(s).padStart(len, '0');
};

const hex = (n, len = null) => {
  const str = n.toString(16);
  const l = Math.ceil(str.length / 2) * 2; // Even number of 0s.
  return zeroPad(str, len || l);
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

export { zeroPad, hex, formatBytes, formatPercentage };
