const mediaQuery = window.matchMedia('(prefers-color-scheme:dark)');
const mediaQueryEventListener = (event) => {
  addColourThemeClass(event.matches ? 'dark' : 'light');
};

// Set the `dark` or `light` class name on the <html> tag.
const addColourThemeClass = (theme) => {
  document.documentElement.classList.remove('dark', 'light');
  document.documentElement.classList.add(theme);
};

// Sets the colour theme, and update the DOM accordingly.
// If no theme is set, listens to changes in the system theme.
const setColourTheme = (theme = null) => {
  mediaQuery.removeEventListener('change', mediaQueryEventListener);

  if (!theme) {
    mediaQuery.addEventListener('change', mediaQueryEventListener);
    theme = mediaQuery.matches ? 'dark' : 'light';
  }

  addColourThemeClass(theme);
};

export { setColourTheme };
