import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

const initialData = window.__INITIAL_DATA__;

ReactDOM.hydrateRoot(document.getElementById('app'), <App initialData={initialData}/>);

