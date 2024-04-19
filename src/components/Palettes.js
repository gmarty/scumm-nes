import { nesNTSCPalette as palette } from '../lib/palettes';
import ColourSwatch from './ColourSwatch';

const Palettes = ({ nametable }) => {
  const palettes = [];

  for (let i = 0; i < 16; i += 4) {
    palettes.push(
      <li
        key={i}
        className="ml-6 space-x-4 whitespace-nowrap pl-2">
        <ColourSwatch colour={palette[nametable.palette[i]]} />
        <ColourSwatch colour={palette[nametable.palette[i + 1]]} />
        <ColourSwatch colour={palette[nametable.palette[i + 2]]} />
        <ColourSwatch colour={palette[nametable.palette[i + 3]]} />
      </li>,
    );
  }

  return <ol className="list-outside list-decimal space-y-1">{palettes}</ol>;
};

export default Palettes;
