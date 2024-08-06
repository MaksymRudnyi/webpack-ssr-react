const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const axios = require('axios');
import Helmet from "react-helmet";

const app = express();
const ReactApp = require('../src/components/app').default;

const fetchUsers = async () => {
  const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
  return usersResponse.data;
};

const fetchUserData = async (userId) => {
  const userPromise = axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  const postsPromise = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const albumsPromise = axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);

  const [userResponse, postsResponse, albumsResponse] = await Promise.all([userPromise, postsPromise, albumsPromise]);

  return {
    user: userResponse.data,
    posts: postsResponse.data,
    albums: albumsResponse.data
  };
};

// app.use(express.static(path.resolve(__dirname, '../dist')));
app.get(/\.(js|scss|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist')));
app.get('*', async (req, res) => {
  const context = {};
  const { url } = req;
  let initialUsers = [];
  let initialUserData = null;
  // const helmetContext = {};
  // console.log('asdfasd')

  if (url.startsWith('/user/')) {
    const userId = url.split('/')[2];
    initialUserData = await fetchUserData(userId);
  } else {
    initialUsers = await fetchUsers();
  }

  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
    encoding: 'utf-8'
  });
  // const reactApp = ReactDOMServer.renderToString(React.createElement(ReactApp));
  const reactApp = ReactDOMServer.renderToString(

      <StaticRouter location={url} context={context}>
        <ReactApp initialData={{users: initialUsers, userData: initialUserData}}/>
      </StaticRouter>

  );
  console.log('html: ', html)
  const helmet = Helmet.renderStatic();


  // console.log('title; ', helmet.title.toString())
  const finalHtml = html
    .replace('<div id="app"></div>', `<div id="app">${reactApp}</div>`)
    .replace('{{helmet}}', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`)
    .replace('{{initialData}}', JSON.stringify({
      users: initialUsers,
      userData: initialUserData
    }));
  res.contentType('text/html');
  res.status(200)
  res.send(finalHtml);
});

app.listen('9000', () => {
  console.log('Server running on port 9000');
});