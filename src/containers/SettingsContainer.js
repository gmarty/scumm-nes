import { useState } from 'react';
import Main from '../components/Main';
import MainHeader from '../components/MainHeader';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { setColourTheme } from '../lib/colourThemeUtils';

const themeOptions = [
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system', defaultTheme: true },
  { name: 'Light', value: 'light' },
];

const SettingsContainer = () => {
  // Find the selected theme, or the default one.
  const selectedThemeValue = localStorage.getItem('theme');
  const selectedTheme =
    themeOptions.find(({ value }) => value === selectedThemeValue) ||
    themeOptions.find(({ defaultTheme }) => defaultTheme);

  const [theme, setTheme] = useState(selectedTheme);

  // Keep the local storage and the DOM in sync with the state.
  const setThemeWrapper = (theme) => {
    setTheme(theme);

    if (theme.defaultTheme) {
      localStorage.removeItem('theme');
      setColourTheme();
      return;
    }

    localStorage.setItem('theme', theme.value);
    setColourTheme(theme.value);
  };

  return (
    <Main>
      <MainHeader title="Settings" />
      <ThemeSwitcher
        theme={theme}
        themeOptions={themeOptions}
        setTheme={setThemeWrapper}
      />
    </Main>
  );
};

export default SettingsContainer;
