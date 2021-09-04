const express = require("express");
const session = require("express-session");
const PGSession = require("connect-pg-simple")(session);
const pool = require("./db");
// const cookie = require("cookie-parser");
const projects = require("./routes/projects");
const walls = require("./routes/walls");
const users = require("./routes/users");

const server = express();
const port = 3001;

server.use(express.json());
server.use("/projects", projects);
server.use("/walls", walls);
server.use("/users", users);
server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 36000,
    },
    store: new PGSession({
      pool: {pool},
      tableName: "user_sessions",
    }),
  })
);
server.use((req, res, next) => {
  console.log(req.session);
  next();
});

server.get("/", (req, res) => {
  res.send("welcome to the root folder of my server");
});

server.listen(port, () => {
  console.log(`Project Manager listening at http://localhost:${port}`);
});
