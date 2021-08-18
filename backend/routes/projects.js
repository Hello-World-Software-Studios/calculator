const express = require("express");
const pool = require("../db");

const router = express.Router();
router.route("/get").get(async (req, res) => {
  const selectAll = await pool.query("SELECT name FROM projects WHERE owner_user_id = 1");
  res.json(selectAll.rows);
});

router.route("/").post(async ({query: {projectName, ownerUserID}}, res) => {
  try {
    // const currentTimestamp = new Date().getTime();
    pool.query(
      "INSERT INTO projects (name, owner_user_id) VALUES ($1)",
        [projectName, ownerUserID]
      );
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
