import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RomProvider } from './contexts/RomContext';
import App from './App';
import ErrorMessage from './components/ErrorMessage';
import { setColourTheme } from './lib/colourThemeUtils';

const basename =
  process.env.NODE_ENV === 'development' ? undefined : '/scumm-nes';

const root = createRoot(document.body);
root.render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <BrowserRouter basename={basename}>
        <RomProvider>
          <App />
        </RomProvider>
      </BrowserRouter>
    </ErrorBoundary>
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
