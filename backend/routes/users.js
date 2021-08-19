const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const selectAll = await pool.query("SELECT * FROM users");
  res.json(selectAll.rows);
});

router.route("/").post(async ({body: {username, password}}, res) => {
  try {
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1)",
        [username, password]
      );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
