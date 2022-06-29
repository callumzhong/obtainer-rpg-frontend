import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoadContextProvider } from 'store/loadContext';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadContextProvider>
        <App />
      </LoadContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
