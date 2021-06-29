import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as socketIO from 'socket.io';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { handleGame } from './game';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(sslRedirect());
app.use(express.json());

const buildDir = path.join(__dirname, '../build');
app.use(express.static(buildDir));

app.use(cors());

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});
const isDev = process.env.NODE_ENV === 'development';
const site = isDev ? 'http://localhost:3000' : 'https://friendshrimp.com';
// setup socket io
let interval;
let io = new socketIO.Server(server, {
  cors: {
    origin: site,
    methods: ['GET', 'POST'],
  },
});

let clientConnectionsCount = 0;

const getApiAndEmit = (socket) => {
  // emitting number of connections
  socket.emit('activeUsers', clientConnectionsCount);
};

io.on('connection', (socket) => {
  // connection
  console.log('A user just connected.');
  clientConnectionsCount++;
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  // handle game logic
  handleGame(socket);

  // disconnection
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
    clientConnectionsCount--;
    clearInterval(interval);
  });
});

const fetchOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

// to get the feed page data
app.get('/get-feed', (req, res) => {
  const blogId = process.env.BLOGGERBLOGID;
  const apiKey = process.env.BLOGGERAPIKEY;
  if (blogId && apiKey) {
    const bloggerUrl = 'https://www.googleapis.com/blogger/v3/blogs/';
    const feedUrl = `${bloggerUrl}${blogId}/posts?key=${apiKey}`;
    fetch(feedUrl, fetchOptions)
      .then((response) => response.json())
      .then((jsonData) => res.status(200).json(jsonData))
      .catch((fetchError) =>
        res.status(500).json({ error: fetchError.message })
      );
  } else {
    res.status(500).json({ error: 'Not available' });
  }
});

// to get hi scores list
// app.get('/get-hiscores', (req, res) => {
//   const { game } = req.query;
// })

// for all other routes, bring to index
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`build/index.html`));
});
