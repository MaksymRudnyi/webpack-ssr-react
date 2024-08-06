import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider} from "react-helmet-async";

const initialData = window.__INITIAL_DATA__;

ReactDOM.hydrateRoot(document.getElementById('app'), (
  <HelmetProvider>
    <BrowserRouter>
      <App {...initialData}/>
    </BrowserRouter>
  </HelmetProvider>)
);

