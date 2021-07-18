const express = require('express');

const server = express();
const port = 3000;
const test

server.get('/', (req, res) => {
  res.send({ name: 'JP', occupation: 'Web Dev' });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
