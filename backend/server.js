const express = require("express");
const server = express();
const port = 3001;
const walls = require("./routes/walls");
server.use(express.json());
server.use("/walls", walls);

const test = (name) => `Hello, ${name}`;

server.get("/", (req, res) => {
  res.send(test("welcome to the root folder of my server"));
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
