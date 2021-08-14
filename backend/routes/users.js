const express = require("express");

const users = [];
const router = express.Router();

router.route("/").get((req, res) => {
  res.json(users);
});
router.route("/").post((req, res) => {
  const user = {name: req.body.name, password: req.body.password};
  users.push(user);
});

module.exports = router;
