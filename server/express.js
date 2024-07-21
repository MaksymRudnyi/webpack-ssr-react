const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();
const ReactApp = require('../src/components/app').default

app.get(/\.(js|scss|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
    encoding: 'utf-8'
  });
  // const reactApp = ReactDOMServer.renderToString(React.createElement(ReactApp));
  const reactApp = ReactDOMServer.renderToString(<ReactApp/>);
  const finalHtml = html.replace('<div id="app"></div>', `<div id="app">${reactApp}</div>`);
  res.contentType('text/html');
  res.status(200)
  res.send(finalHtml);
});

app.listen('9000', () => {
  console.log('Server running on port 9000');
});