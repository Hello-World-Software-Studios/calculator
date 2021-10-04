const express = require("express");
const pool = require("../db");
const authorization = require("../utils/authorize");

const router = express.Router();

router.route("/").get(authorization, async (req, res) => {
  try {
    const selectWalls = await pool.query(
      "SELECT wall_length FROM walls WHERE walls.project_id = $1;",
      [req.query.projectID]
    );
    res.json(selectWalls.rows);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});
router.route("/").post(authorization, async ({body: {wallLength, projectID}}, res) => {
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
