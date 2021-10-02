const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = await req.header("Authorization");
    if (!jwtToken) {
      res.status(400).json({message: "No access token"});
    }
    try {
      const payload = await jwt.verify(
        jwtToken.replace("Bearer ", ""),
        process.env.jwtSecret
      );
      req.id = payload.id;
    } catch (err) {
      res.status(403).json({message: `Error during authorization: ${err.message}`});
    }
    // const payload = await jwt.verify(
    //   jwtToken.replace("Bearer ", ""),
    //   process.env.jwtSecret
    // );
    // req.id = payload.id;
  } catch (err) {
    res.status(403).json({message: err.message});
  }
  next();
};
