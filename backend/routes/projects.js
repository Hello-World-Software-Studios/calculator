const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/get").get(async (req, res) => {
  const selectAll = await pool.query("SELECT name FROM projects");
  res.json(selectAll.rows);
});

router.route("/post").post(async ({body: {projectName, ownerUserID}}, res) => {
  console.log(projectName, ownerUserID);
  try {
    // const currentTimestamp = new Date().getTime();
    const newProject = await pool.query(
      "INSERT INTO projects (name, owner_user_id) VALUES ($1, $2)",
        [projectName, ownerUserID]
      );
      res.json(newProject.rows);
  } catch (err) {
    res.json({message: err.message});
    console.error(err.message);
  }
});

module.exports = router;
