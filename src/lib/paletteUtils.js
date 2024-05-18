import {
  digitalPrimeFbxPalette as colourPalette,
  greyscalePalette,
  dmgPalette,
} from '../lib/palettes';

const getPalette = (palette = [], forceColour = false) => {
  palette = palette.map((p) => colourPalette[p]);

  if (forceColour) {
    return palette;
  }

  switch (localStorage.getItem('palette')) {
    default:
    case 'fbx':
      return palette;

    case 'grey':
      return greyscalePalette;

    case 'dmg':
      // Method 1: maps the palette to DMG's based on each colour luminosity.
      // The result may lack some DMG colours.
      // Looks closer to the NES, but some colours are lost.
      return palette.map((p) => {
        const luminosity = getLuminosity(p);

        if (luminosity > 205) {
          return dmgPalette[3];
        } else if (luminosity > 130) {
          return dmgPalette[2];
        } else if (luminosity > 65) {
          return dmgPalette[1];
        } else {
          return dmgPalette[0];
        }
      });

    case 'dmg': // Unused
      // Method 2: Sort the colours by brightness and maps to DMG's palette.
      // May result in the same colour being mapped to 2 different DMG colour on different palettes.
      // The colours looks harsher and there are some artefacts.
      palette = palette.map((p, order) => ({
        order,
        luminosity: getLuminosity(p),
      }));
      palette.sort((a, b) => a.luminosity - b.luminosity);
      palette = palette.map((p, i) => ({
        ...p,
        dmg: dmgPalette[i],
      }));
      palette.sort((a, b) => a.order - b.order);
      palette = palette.map(({ dmg }) => dmg);

      return palette;
  }
};

// See https://gist.github.com/w3core/e3d9b5b6d69a3ba8671cc84714cca8a4
const getLuminosity = (color = '') => {
  const m = color
    .substring(1)
    .match(/\S{2}/g)
    .map((c) => parseInt(c, 16));

  return m[0] * 0.299 + m[1] * 0.587 + m[2] * 0.114;
};

export { getPalette, getLuminosity };
