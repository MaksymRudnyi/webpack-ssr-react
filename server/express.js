const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
    encoding: 'utf-8'
  });
  res.contentType('text/html');
  res.status(200)
  res.send(html);
});

app.listen('9000', () => {
  console.log('Server running on port 9000');
});