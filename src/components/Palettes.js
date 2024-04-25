import ColourSwatch from './ColourSwatch';
import { getPalette } from '../lib/paletteUtils';

const Palettes = ({ nametable }) => {
  const colourSwatches = [];

  for (let i = 0; i < 16; i += 4) {
    const palette = getPalette(
      [
        nametable.palette[i],
        nametable.palette[i + 1],
        nametable.palette[i + 2],
        nametable.palette[i + 3],
      ],
      true,
    );

    colourSwatches.push(
      <li
        key={i}
        className="ml-6 space-x-4 whitespace-nowrap pl-2">
        <ColourSwatch colour={palette[0]} />
        <ColourSwatch colour={palette[1]} />
        <ColourSwatch colour={palette[2]} />
        <ColourSwatch colour={palette[3]} />
      </li>,
    );
  }

  return (
    <ol className="list-outside list-decimal space-y-1">{colourSwatches}</ol>
  );
};

export default Palettes;
