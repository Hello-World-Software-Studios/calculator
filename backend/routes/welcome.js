const router = require("express").Router();
const pool = require("../db");
const authorization = require("../utils/auth");

router.route("/").get(authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [req.user]);
    res.json(user.rows[0]);
  } catch (err) {
    res.json({message: err.message});
  }
});

module.exports = router;
