const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/get").get(async (req, res) => {
  const selectAll = await pool.query("SELECT name FROM projects WHERE owner_user_id = 1");
  res.json(selectAll.rows);
});

router.route("/post").post(async ({query: {projectName, ownerUserID}}, res) => {
  console.log(projectName, ownerUserID);
  try {
    // const currentTimestamp = new Date().getTime();
    const newProject = await pool.query(
      "INSERT INTO projects (name, owner_user_id) VALUES ($1)",
        [projectName, ownerUserID]
      );
      res.json(newProject.rows)
  } catch (err) {
    console.log(projectName, ownerUserID);
    console.error(err.message);
  }
});

module.exports = router;
