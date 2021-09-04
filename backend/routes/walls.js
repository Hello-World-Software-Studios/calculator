const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/post").post(async ({body: {length, projectID}}, res) => {
  try {
    const newWall = await pool.query(
      "INSERT INTO walls (wall_length, project_id) VALUES ($1, $2) RETURNING wall_length, project_id",
      [length, projectID]
    );
    res.json(newWall.rows);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
