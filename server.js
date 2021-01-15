const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('mongodb');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
app.use(sslRedirect());
app.use(bodyParser.json());

const buildDir = __dirname + '/build/';
app.use(express.static(buildDir));

app.use(cors());

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});

// setup websockets
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`server received: ${message}`);
    wss.clients.forEach(client => {
      client.send(message);
    });
  })
});

const fetchOptions = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
};

// to get the feed page data
app.get('/get-feed', (req, res) => {
  const blogId = process.env.BLOGGERBLOGID;
  const apiKey = process.env.BLOGGERAPIKEY;
  if (blogId && apiKey) {
    const bloggerUrl = 'https://www.googleapis.com/blogger/v3/blogs/';
    const feedUrl = `${bloggerUrl}${blogId}/posts?key=${apiKey}`;
    fetch(feedUrl, fetchOptions)
      .then(response => response.json())
      .then(jsonData => res.status(200).json(jsonData))
      .catch(fetchError => res.status(500).json({ error: fetchError.message }));
  } else {
    res.status(500).json({ error: 'Not available' });
  }
});

// to get and set games for card battle
// app.get('/game-server/card-battle', (req, res) => {
//   const { gameId } = req.params;

// });

// to get hi scores list
// app.get('/get-hiscores', (req, res) => {
//   const { game } = req.query;
// })

// for all other routes, bring to index
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});
