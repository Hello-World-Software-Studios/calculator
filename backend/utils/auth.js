const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res) => {
  try {
    const jwtToken = await req.header("token");
    if (!jwtToken) {
      res.status(403).json({message: "Not Authorized"});
    }

    const payload = await jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
  } catch (err) {
    console.log({message: err.message});
    res.status(403).json({message: "Not Authorized"});
  }
};
