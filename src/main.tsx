import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UpdateProvider } from './context/UpdateContext';
import { PWAProvider } from './context/PWAContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <UpdateProvider>
        <PWAProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PWAProvider>
      </UpdateProvider>
    </ThemeProvider>
  </StrictMode>,
);

