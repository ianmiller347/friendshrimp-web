import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as socketIO from 'socket.io';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { handleGame } from './game';
import { listActiveUsers } from './active-shrimps';
import { addShrimpDonor, getShrimpDonors } from './shrimp-donors';

// @ts-expect-error this has been here for years without an issue
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(sslRedirect());
app.use(express.json());

const buildDir = path.join(__dirname, '../build');
app.use(express.static(buildDir));

app.use(cors());

const server = app.listen(process.env.PORT || 8080, () => {
  // @ts-expect-error frigoff ts
  const port = server.address().port;
  console.log('App now running on port', port);
});
const isDev = process.env.NODE_ENV === 'development';
const site = isDev ? 'http://localhost:3000' : 'https://friendshrimp.com';
// setup socket io
let interval;
const io = new socketIO.Server(server, {
  cors: {
    origin: site,
    methods: ['GET', 'POST'],
  },
});

// setup number of connected users
const getApiAndEmit = async (socket) => {
  // emitting number of connections
  const activeUsers = await listActiveUsers();
  // @ts-expect-error the type isnt set and it has optional error
  if (!activeUsers?.error) {
    socket.emit('playersList', activeUsers || []);
  }
};

io.on('connection', (socket) => {
  // connection
  console.log('A user just connected.');
  // send the client the id
  socket.send(socket.id);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  // handle game logic
  handleGame(socket);

  // disconnection
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
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

// shrimp donor api
app.get('/shrimp-donors', async (req, res) => {
  const shrimpDonors = await getShrimpDonors();
  res.status(200).json(shrimpDonors);
});
app.post('/shrimp-donors', async (req, res) => {
  const shrimpDonor = await addShrimpDonor(req.body);
  res.status(200).json(shrimpDonor);
});

// for all other routes, bring to index
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`build/index.html`));
});
