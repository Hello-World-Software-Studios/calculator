const validInfo = (req, res, next) => {
  const {username, password} = req.body;
  if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      res.json("Missing Credentials");
    }
    next();
  }
};

module.exports = validInfo;
