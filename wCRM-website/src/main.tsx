import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { PreviewNote } from './components/PreviewNote';
import { App } from './App';
import './styles/index.css';

const IS_ARTIFACT = import.meta.env.MODE === 'artifact';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {IS_ARTIFACT ? (
      // Hosted previews cannot use URL paths, so routes live in memory there.
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
        <PreviewNote />
      </MemoryRouter>
    ) : (
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>,
);
