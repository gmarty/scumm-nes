import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { setColourTheme } from './lib/colourThemeUtils';

const basename =
  process.env.NODE_ENV === 'development' ? undefined : '/scumm-nes';

const root = createRoot(document.body);
root.render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

setColourTheme(localStorage.getItem('theme'));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production' && insights) {
  // Load the analytics.
  // eslint-disable-next-line no-undef
  insights.init('OTy7QFoUv4bUuKzo');
  // eslint-disable-next-line no-undef
  insights.trackPages();
}
