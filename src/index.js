import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithProviders from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);