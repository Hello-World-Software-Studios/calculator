const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtGenerator = (userID) => {
  const payload = {
    user: userID,
  };
  return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "24hr"});
};

module.exports = jwtGenerator;
