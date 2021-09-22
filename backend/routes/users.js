const express = require("express");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const pool = require("../db");
const validInfo = require("../utils/validInfo");
const authorization = require("../utils/authorize");
const authentication = require("../utils/authenticate");

const router = express.Router();

const USERNAME_ALREADY_EXISTS = "Username already exists.";
const LOGIN_ERROR = "Check your username and/or password.";

router.route("/verify").get(authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log({message: err.message});
    res.status(500).json({message: "Server Error"});
  }
});

router.route("/name").get(authentication, async (req, res) => {
  try {
    const selectUsername = await pool.query("SELECT username FROM users WHERE id = $1", [
      req.id,
    ]);
    res.json(selectUsername.rows[0]);
  } catch (err) {
    console.log({message: err.message});
    res.status(500).json({message: "Server Error"});
  }
});
// TODO route /users/current
router.route("/register").post(async ({body: {username, password}}, res) => {
  try {
    const selectUsers = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (selectUsers.rows.length > 0) {
      res.status(401).json({error: USERNAME_ALREADY_EXISTS});
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bryptPassword = await bcrypt.hash(password, salt);

    const {
      rows: [{id: incomingID}],
    } = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, bryptPassword]
    );
    console.log(incomingID);
    const token = jwtGenerator(incomingID);
    res.json({token});
  } catch (err) {
    res.json({message: err.message});
  }
});

router.route("/login").post(validInfo, async ({body: {username, password}}, res) => {
  try {
    const returningUser = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (returningUser.rows.length === 0) {
      res.status(401).json({error: LOGIN_ERROR});
    }
    const validPassword = await bcrypt.compare(password, returningUser.rows[0].password);

    if (!validPassword) {
      res.status(401).json({error: LOGIN_ERROR});
    }

    const token = jwtGenerator(returningUser.rows[0].id);
    res.json({token});
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
