const express = require("express");
const session = require("express-session");
const projects = require("./routes/projects");
const walls = require("./routes/walls");


const server = express();
const port = 3001;
server.use(express.json());
server.use("/projects", projects);
server.use("/walls", walls);
server.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: false,
}));

server.get("/", (req, res) => {
  res.send("welcome to the root folder of my server");
});

server.listen(port, () => {
  console.log(`Project Manager listening at http://localhost:${port}`);
});
