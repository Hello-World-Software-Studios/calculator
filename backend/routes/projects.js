const express = require("express");
const pool = require("../db");
const authorization = require("../utils/authorize");

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
router.route("/current").get(authorization, async (req, res) => {
  try {
    const selectUsersData = await pool.query("SELECT projects.name, projects.id, walls.wall_length, walls.project_id FROM users INNER JOIN projects ON users.id=projects.owner_user_id INNER JOIN walls ON projects.id=walls.project_id WHERE users.id = $1;",
     [req.id]);
    res.json(selectUsersData.rows);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});
// router.route("/get").get(async ({body: {id: ownerUserID}}, res) => {
//   try {
//     const selectAll = await pool.query(
//       "SELECT name, wall_length, FROM projects INNER JOIN walls ON projects.id = walls.project_id WHERE owner_user_id = $1;",
//       [ownerUserID]
//     );
//     res.json(selectAll.rows);
//   } catch (err) {
//     res.json({message: err.message});
//   }
// });


router.route("/").post(authorization, async (req, res) => {
  const {body: {currentProject}} = req;
  try {
    const newProject = await pool.query(
      "INSERT INTO projects (name, owner_user_id) VALUES ($1, $2) RETURNING id, name",
      [currentProject.name, req.id]
    );
    res.json(newProject.rows[0]);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
