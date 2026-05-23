import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize anti-close if previously enabled
if (localStorage.getItem('tank5_anti_close') === 'true') {
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'Leave site? Changes you made may not be saved.';
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
