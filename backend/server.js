const express = require("express");

const server = express();
const port = 3001;
const user = require("./routes/userRoutes");
server.use("/userRoutes", user);

const test = (name) => `Hello, ${name}`;

server.get("/", (req, res) => {
  res.send(test("World"));
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
