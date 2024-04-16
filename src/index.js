import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = createRoot(document.body);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
