import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet';
const initialData = window.__INITIAL_DATA__;

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <BrowserRouter>

      <App initialData={initialData}/>

  </BrowserRouter>
);
