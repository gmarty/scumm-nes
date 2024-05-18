import ColourPicker from './ColourPicker';
import ColourSwatch from './ColourSwatch';
import { getPalette } from '../lib/paletteUtils';

const Palettes = ({ palette, onUpdate }) => {
  const colourSwatches = [];

  for (let i = 0; i < 16; i += 4) {
    const colours = getPalette(
      [palette[i], palette[i + 1], palette[i + 2], palette[i + 3]],
      true,
    );

    colourSwatches.push(
      <li
        key={i}
        className="ml-6 space-x-4 whitespace-nowrap pl-2">
        <ColourPicker
          colourId={palette[i]}
          onPick={(newColour) => onUpdate(i, newColour)}>
          <ColourSwatch colour={colours[0]} />
        </ColourPicker>

        <ColourPicker
          colourId={palette[i + 1]}
          onPick={(newColour) => onUpdate(i + 1, newColour)}>
          <ColourSwatch colour={colours[1]} />
        </ColourPicker>

        <ColourPicker
          colourId={palette[i + 2]}
          onPick={(newColour) => onUpdate(i + 2, newColour)}>
          <ColourSwatch colour={colours[2]} />
        </ColourPicker>

        <ColourPicker
          colourId={palette[i + 3]}
          onPick={(newColour) => onUpdate(i + 3, newColour)}>
          <ColourSwatch colour={colours[3]} />
        </ColourPicker>
      </li>,
    );
  }

  return (
    <ol className="list-outside list-decimal space-y-1">{colourSwatches}</ol>
  );
};

export default Palettes;
