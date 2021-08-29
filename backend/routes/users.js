const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const selectAll = await pool.query("SELECT * FROM users");
  res.json(selectAll.rows);
});

router.route("/post").post(async ({body: {username, password}}, res) => {
  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
        [username, password]
      );
    res.json(newUser.rows);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
