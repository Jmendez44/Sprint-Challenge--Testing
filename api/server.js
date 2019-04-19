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


// server.get('/hobbits', async (req, res) => {
//   const rows = await hobbits.getAll();

//   res.status(200).json(rows);
// });

module.exports = server;
