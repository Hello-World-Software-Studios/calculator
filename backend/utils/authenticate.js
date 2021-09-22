const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const authenticateHeader = req.headers.Authorization;
    const jwtToken = await authenticateHeader.split(' ')[1];

    if (!jwtToken) {
      res.status(401).json({message: "You need an access token"});
    }

    const payload = await jwt.verify(jwtToken, process.env.jwtSecret);
    req.id = payload.id;
    
  } catch (err) {
    console.log({message: err.message});
    res.status(403).json({message: "Not Authorized"});
  }
  next();
};