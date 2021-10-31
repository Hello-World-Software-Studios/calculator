const express = require("express");
const pool = require("../db");
const authorization = require("../utils/authorize");

const router = express.Router();

router.route("/").get(authorization, async (req, res) => {
  try {
    const selectWalls = await pool.query(
      "SELECT wall_length, id FROM walls WHERE walls.project_id = $1;",
      [req.query.projectID]
    );
    res.json(selectWalls.rows);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});
router
  .route("/")
  .post(authorization, async ({body: {postWallContextHelper, id}}, res) => {
    try {
      const newWall = await pool.query(
        "INSERT INTO walls (wall_length, project_id) VALUES ($1, $2) RETURNING wall_length, id",
        [postWallContextHelper, id]
      );
      res.json(newWall.rows);
    } catch (err) {
      res.json({message: err.message});
    }
  });

module.exports = router;

router.route("/").delete(authorization, async (req, res) => {
  try {
    await pool.query("DELETE FROM walls WHERE id = $1", [req.query.id]);
    res.json({status: "Deleted!"});
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
