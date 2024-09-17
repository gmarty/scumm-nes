import { useState } from 'react';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ThemeSwitcher from '../components/ThemeSwitcher';
import PaletteSelector from '../components/PaletteSelector';
import NameSelector from '../components/ScreenNamesSelector';
import { setColourTheme } from '../lib/colourThemeUtils';

import digitalPrimeFbxImg from '../assets/palettes/digital-prime-fbx.png';
import greyscaleImg from '../assets/palettes/greyscale.png';
import dmgImg from '../assets/palettes/dmg.png';

const themeOptions = [
  { value: 'dark', name: 'Dark' },
  { value: 'system', name: 'System', defaultOption: true },
  { value: 'light', name: 'Light' },
];

const paletteOptions = [
  {
    value: 'fbx',
    name: 'Digital Prime (FBX)',
    description: 'As accurate as it can get',
    defaultOption: true,
    img: digitalPrimeFbxImg,
  },
  {
    value: 'grey',
    name: 'Greyscale',
    description: 'No palette applied',
    img: greyscaleImg,
  },
  {
    value: 'dmg',
    name: 'DMG',
    description: 'Plays well with GB Studio',
    experimental: true,
    img: dmgImg,
  },
];

const nameOptions = [
  {
    value: 'mm',
    name: 'Names from Maniac Mansion',
    description: 'Useful when working on a Maniac Mansion ROM hack.',
    defaultOption: true,
  },
  {
    value: 'numbers',
    name: 'Numbered items',
    description: 'Better if your ROM hack is a completely different game.',
  },
];

const SettingsContainer = () => {
  // Find the options set, or the default ones.
  const selectedThemeValue = localStorage.getItem('theme');
  const selectedTheme =
    themeOptions.find(({ value }) => value === selectedThemeValue) ||
    themeOptions.find(({ defaultOption }) => defaultOption);

  const selectedPaletteValue = localStorage.getItem('palette');
  const selectedPalette =
    paletteOptions.find(({ value }) => value === selectedPaletteValue) ||
    paletteOptions.find(({ defaultOption }) => defaultOption);

  const selectedNameValue = localStorage.getItem('screen-name');
  const selectedName =
    nameOptions.find(({ value }) => value === selectedNameValue) ||
    nameOptions.find(({ defaultOption }) => defaultOption);

  const [theme, setTheme] = useState(selectedTheme);
  const [palette, setPalette] = useState(selectedPalette);
  const [name, setName] = useState(selectedName);

  // Keep the local storage and the DOM in sync with the state.
  const setThemeWrapper = (theme) => {
    setTheme(theme);

    if (theme.defaultOption) {
      localStorage.removeItem('theme');
      setColourTheme();
      return;
    }

    localStorage.setItem('theme', theme.value);
    setColourTheme(theme.value);
  };

  const setPaletteWrapper = (palette) => {
    setPalette(palette);

    if (palette.defaultOption) {
      localStorage.removeItem('palette');
      return;
    }

    localStorage.setItem('palette', palette.value);
  };

  const setNameWrapper = (name) => {
    setName(name);

    if (name.defaultOption) {
      localStorage.removeItem('screen-name');
      return;
    }

    localStorage.setItem('screen-name', name.value);
  };

  return (
    <Main>
      <MainHeader title="Settings" />
      <ThemeSwitcher
        theme={theme}
        themeOptions={themeOptions}
        setTheme={setThemeWrapper}
      />
      <PaletteSelector
        palette={palette}
        paletteOptions={paletteOptions}
        setPalette={setPaletteWrapper}
      />
      <NameSelector
        screenName={name}
        screenNameOptions={nameOptions}
        setScreenName={setNameWrapper}
      />
    </Main>
  );
};

export default SettingsContainer;
