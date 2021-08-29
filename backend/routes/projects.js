const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/").get(async ({body: {id: ownerUserID}}, res) => {
  try {
    const selectProject = await pool.query(
      "SELECT id, name, owner_user_id FROM projects WHERE owner_user_id = $1;",
      [ownerUserID]
      );
    res.json(selectProject.rows);
  } catch (err) {
    res.json({message: err.message});
  }
});

router.route("/get").get(async ({body: {id: ownerUserID}}, res) => {
  try {
    const selectAll = await pool.query(
      "SELECT name, wall_length FROM projects INNER JOIN walls ON projects.id = walls.project_id WHERE owner_user_id = $1;",
      [ownerUserID]
      );
    res.json(selectAll.rows);
  } catch (err) {
    res.json({message: err.message});
  } 
});

router.route("/post").post(async ({body: {projectName, ownerUserID}}, res) => {
  try {
    const newProject = await pool.query(
      "INSERT INTO projects (name, owner_user_id) VALUES ($1, $2) RETURNING id, name, owner_user_id",
        [projectName, ownerUserID]
      );
      res.json(newProject.rows);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
