const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/get").post(async ({body: {username}}, res) => {
  try {
    const userInfo = await pool.query(  
    "SELECT users.username, users.id, projects.name, projects.owner_user_id, walls.project_id, walls.wall_length FROM users INNER JOIN projects ON users.id=projects.owner_user_id INNER JOIN walls ON projects.id=walls.project_id WHERE users.username=($1)",
    [username]);
    res.json(userInfo.rows);
    } catch (err) {
      res.json({message: err.message});
    }
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
