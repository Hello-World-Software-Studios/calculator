const express = require("express");
const pool = require("../db");
const authorization = require("../utils/authorize");

const router = express.Router();

router.route("/post").post(authorization, async ({body: {wallLength, projectID}}, res) => {
  try {
    const newWall = await pool.query(
      "INSERT INTO walls (wall_length, project_id) VALUES ($1, $2) RETURNING wall_id",
      [wallLength, projectID]
    );
    res.json(newWall.rows);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
