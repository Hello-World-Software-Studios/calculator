const express = require("express");
const pool = require("../db");
const authorization = require("../utils/authorize");

const router = express.Router();
// const SQL_SELECT_PROJECTS = `
// SELECT projects.id, projects.name
// FROM projects
// WHERE projects.owner_user_id = $1;
// `;

router.route("/").get(authorization, async (req, res) => {
  try {
    const selectProjects = await pool.query(
      "SELECT projects.id, projects.name FROM projects WHERE projects.id = $1;",
      [req.query.id]
    );
    res.json(selectProjects.rows);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.route("/list").get(authorization, async (req, res) => {
  try {
    const selectProjects = await pool.query(
      "SELECT projects.id, projects.name FROM projects WHERE projects.owner_user_id = $1;",
      [req.id]
    );
    res.json(selectProjects.rows);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.route("/").post(authorization, async (req, res) => {
  const {
    body: {projectInput},
  } = req;
  try {
    const newProject = await pool.query(
      "INSERT INTO projects (name, owner_user_id) VALUES ($1, $2) RETURNING id, name",
      [projectInput, req.id]
    );
    res.json(newProject.rows[0]);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
