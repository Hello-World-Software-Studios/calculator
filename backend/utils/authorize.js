const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = await req.header("Authorization");
    if (!jwtToken) {
      res.status(403).json({message: "No access token"});
    }

    const payload = await jwt.verify(jwtToken, process.env.jwtSecret);
    req.id = payload.id;
    
  } catch (err) {
    console.log({message: err.message});
    res.status(403).json({message: "Invalid Token: Access Denied"});
  }
  next();
};
