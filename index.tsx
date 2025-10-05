import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';

// PWA Install Prompt Handling (as early as possible to avoid race conditions)
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('`beforeinstallprompt` event caught globally.');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  (window as any).deferredInstallPrompt = e;
  // Notify the app that the prompt is ready
  window.dispatchEvent(new CustomEvent('pwa-install-ready'));
});


// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch((err: any) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);