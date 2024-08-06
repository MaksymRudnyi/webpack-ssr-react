const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const axios = require('axios');
const app = express();
const ReactApp = require('../src/components/app').default
const { StaticRouter } = require('react-router-dom/server');
import { HelmetProvider } from 'react-helmet-async';

const fetchUsers = async () => {
  const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
  return usersResponse.data;
}

const fetchUserData = async (id) => {
  const userResponse =  axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  const postsResponse = axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const albumsResponse = axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);

  const [user, posts, albums] = await Promise.all([userResponse, postsResponse, albumsResponse]);
  return {
    user: user.data,
    posts: posts.data,
    albums: albums.data
  };
}

app.get(/\.(js|scss|css|map|ico)$/, express.static(path.resolve(__dirname, '../dist')));
app.get('*', async (req, res) => {
  let initialUsers = [];
  let userData = {};
  const context = {};
  const { url } = req;

  if (url.startsWith('/user/')) {
    const userId = url.split('/')[2];
    userData = await fetchUserData(userId)
  } else {
    initialUsers = await fetchUsers();
  }

  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), {
    encoding: 'utf-8'
  });

  let helmetContext = {}
  // const reactApp = ReactDOMServer.renderToString(React.createElement(ReactApp));
  const reactApp = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} context={context}>
        <ReactApp userData={userData} users={initialUsers}/>
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  console.log('title: ', helmet.title.toString());

  const finalHtml = html
    .replace('<div id="app"></div>', `<div id="app">${reactApp}</div>`)
    .replace('{{helmet}}', `${helmet.title.toString()} ${helmet.meta.toString()}`)
    .replace('{{initialData}}', JSON.stringify({
      users: initialUsers,
      userData
    })
  );
  res.contentType('text/html');
  res.status(200)
  res.send(finalHtml);
});

app.listen('3000', () => {
  console.log('Server running on port 9000');
});