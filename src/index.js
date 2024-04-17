import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const basename =
  process.env.NODE_ENV === 'development' ? undefined : '/scumm-nes';

const root = createRoot(document.body);
root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
);
