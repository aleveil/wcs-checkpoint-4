const tables = require("../tables");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await tables.user.findByEmail(email);
    if (user && user.password === password) {
      delete user.password;
      return res.status(200).json(user);
    }
    return res.sendStatus(401);
  } catch (err) {
    next(err);
  }
  return 0;
};

module.exports = {
  login,
};
