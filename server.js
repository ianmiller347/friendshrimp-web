const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const socketIO = require('socket.io');
app.use(sslRedirect());
app.use(bodyParser.json());

const buildDir = __dirname + '/build/';
app.use(express.static(buildDir));

app.use(cors());

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});

const site = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://friendshrimp.com';
// setup socket io
let interval;
let io = socketIO(server, {
  cors: {
    origin: site,
    methods: ['GET', 'POST']
  }
});

const gameState = {
  playerMap: {},
  gameMap: {},
};

// get new cards based on whether or not you won
const getNewCards = (didWin, oldCards, cardDrawn, otherCardDrawn) => {
  // if u win u get other card drawn
  if (didWin) {
    return [
      ...oldCards,
      otherCardDrawn,
    ];
  }
  // if u lose u lose card drawn
  return oldCards.filter(card => !cardMatches(cardDrawn, card));
};

const setGameState = (gameId, newGameState) => {
  gameState.gameMap[gameId] = {
    ...game.gameMap[gameId],
    ...newGameState,
  };
}

// const updateGameState = (newState, id) =>
const handleGameOutcomeLogic = (drawCardData, game, player1IsPlayer1) => {
  const { gameData } = game;
  const cardDrawn1 = player1IsPlayer1 ? gameData.player1Drawn : gameData.player2Drawn;
  const cardDrawn2 = player1IsPlayer1 ? gameData.player2Drawn : gameData.player1Drawn;
  const player1Cards = player1IsPlayer1 ? gameData.player1Cards : gameData.player2Cards;
  const player2Cards = player1IsPlayer1 ? gameData.player2Cards : gameData.player1Cards;

  // now calculate the outcome
  const isBattle = cardDrawn1.count === cardDrawn2.count;
  if (isBattle) {
    // for now just let the tie go to the user
    // TODO: put a card down then flip the next
  }
  const player1Wins = cardDrawn1.count > cardDrawn2.count;
  const player1Name = game.players.find(player => player.isCreator).displayName;
  const player2Name = game.players.find(player => !player.isCreator).displayName;
  // now set their decks with the result
  const winnerText = player1Wins ? `${player1Name} wins.` : `${player2Name} wins.`;
  // todo fix 
  const player1NewCards = getNewCards(player1Wins, player1Cards, cardDrawn1, cardDrawn2);
  const player2NewCards = getNewCards(!player1Wins, player2Cards, cardDrawn2, cardDrawn1);

  setGameState(drawCardData.gameId, {
    ...game,
    gameData: {
      ...game.gameData,
      player1Drawn: null,
      player2Drawn: null,
      player1Cards: player1NewCards,
      player2Cards: player2NewCards,
      gameStatus: winnerText,
    },
  });
}

const handleDrawCardLogic = (drawCardData) => {
  const thisGame = gameState.gameMap[drawCardData.gameId];
  const player1IsPlayer1 = !!thisGame.players.find(player => player.id === drawCardData.playerId).isCreator;
  const hasPlayer1Drawn = (player1IsPlayer1 && thisGame.gameData.player1Drawn) 
    || (!player1IsPlayer1 && thisGame.gameData.player2Drawn);
  const hasPlayer2Drawn = (player1IsPlayer1 && thisGame.gameData.player2Drawn) 
    || (!player1IsPlayer1 && thisGame.gameData.player1Drawn);

  gameState.gameMap[drawCardData.gameId] = {
    ...thisGame,
    gameData: {
      ...thisGame.gameData,
      player1Drawn: hasPlayer1Drawn,
      player2Drawn: hasPlayer2Drawn,
    },
  };

  if (hasPlayer1Drawn && hasPlayer2Drawn) {
    setTimeout(() => {
      // both hands drawn.. 
      gameState.gameMap[drawCardData.gameId] = {
        ...thisGame,
        gameData: {
          ...thisGame.gameData,
          gameStatus: 'Both hands drawn. And the winner is...',
        },
      };
      handleGameOutcomeLogic(drawCardData, thisGame, player1IsPlayer1);
    }, 1111);
  }
};

let clientConnectionsCount = 0;

const getApiAndEmit = socket => {
  // Emitting gameState to client
  socket.emit('gameState', gameState);
  // emitting number of connections
  socket.emit('activeUsers', clientConnectionsCount)
};

io.on('connection', (socket) => {
  // connection
  console.log('A user just connected.');
  clientConnectionsCount++;
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  // handle new player joining
  socket.on('newPlayer', (newPlayerData) => {
    gameState.playerMap[socket.id] = {
      id: socket.id,
      name: 'Not David',
      displayName: newPlayerData.name,
    };
  });

  // handle create new game
  socket.on('newGame', (newGameData) => {
    const newGameId = newGameData.gameId;
    // first check if the game exists and if it does tell them no
    if (!gameState.gameMap[newGameId]) {
      gameState.gameMap[newGameId] = {
        gameId: newGameId,
        players: [
          {
            id: socket.id,
            displayName: newGameData.playerName,
            isCreator: true,
          },
        ],
        gameName: newGameData.gameName,
        gameData: {
          ...newGameData.gameData,
          player1Id: socket.id,
        },
      };
    } else {
      socket.broadcast.emit('Game title already exists. Try again.');
    }
  });

  // handle draw card
  socket.on('drawCard', (drawCardData) => {
    handleDrawCardLogic(drawCardData);
  });

  // joining a room by id
  socket.on('joinGame', (joinGameData) => {
    const joinGameId = joinGameData.gameId;
    console.log(`Socket ${socket.id} joining ${joinGameId}`);
    if (gameState.gameMap[joinGameId].players.length) {
      gameState.gameMap[joinGameId].players.push({
        id: socket.id,
        displayName: joinGameData.gameId,
        isCreator: false,
      });
    } else {
      socket.broadcast.emit('joinGameError', 'Game ID does not exist. Try again.');
    }
  });

  // disconnection
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
    delete gameState.playerMap[socket.id];
    clientConnectionsCount--;
    // TODO: delete games not being used, add checker if they got phantom boies
    Object.keys(gameState.gameMap).forEach(key => {
      const matchinGame = gameState.gameMap[key];
      if (!matchinGame.players.length) {
        delete gameState.gameMap[key];
      }
    });
    clearInterval(interval);
  });
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

// to get hi scores list
// app.get('/get-hiscores', (req, res) => {
//   const { game } = req.query;
// })

// for all other routes, bring to index
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});
