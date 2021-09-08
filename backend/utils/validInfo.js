const validInfo = (req, res, next) => {
  const {username, password} = req.body;
  if (req.path === "/register") {
    if (![username, password].every(Boolean)) {
      res.json("Missing Credentials");
    }
    next();
  }
};

module.exports = validInfo;
