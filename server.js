const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
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

const FEED_AUTH = 'feedAuth';
let db;

// mongo DB setup
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongodb.MongoClient.connect(mongoURI, (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log('Database connection ready');

  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log('App now running on port', port);
  });
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
  db.collection(FEED_AUTH).find({}).toArray((err, docs) => {
    if (err) {
      console.log(`ERROR: ${err.message}`);
      res.status(500).json({ error: err.message });
    } else {
      const blogId = docs[0].blogId;
      const apiKey = docs[0].apiKey;
      const bloggerUrl = 'https://www.googleapis.com/blogger/v3/blogs/';
      const feedUrl = `${bloggerUrl}${blogId}/posts?key=${apiKey}`;
      fetch(feedUrl, fetchOptions)
        .then(response => response.json())
        .then(jsonData => res.status(200).json(jsonData))
        .catch(fetchError => res.status(500).json({ error: fetchError.message }));
    }
  })
});

// to get and set games for card battle


// for all other routes, bring to index
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});
