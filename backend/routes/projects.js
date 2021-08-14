const express = require("express");
const pool = require("../db");

const router = express.Router();

router.route("/").get(async (req, res) => {
  const selectAll = await pool.query("SELECT * FROM projects");
  res.json(selectAll.rows);
});
// router.route("/").post(async (req, res) => {
//   try {
//     const {project} = req.body;
//     pool.query(
//       `INSERT INTO projects (name, owner_user_id, date_created) VALUES (${
//         (project.name, project.owner_user_id, "2005-07-08 00:00:00")
//       });`
//     );
//   } catch (err) {
//     console.error(err.message);
//   }
// });

module.exports = router;
