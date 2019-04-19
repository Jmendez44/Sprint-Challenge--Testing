const express = require('express');

const games = require('../games/games')

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
  const list = await games.getAll();
  res.status(200).json(list);
})

server.post('/games', async (req, res) => {
  const game = req.body;

  if (game.title) {
      const ids = await games.insert(game)
      res.status(201).json(ids[0]);
  }
  else {
      res.status(422).json({error: 'missing title'})
  }
})



module.exports = server;
