const session = require("express-session");
const userModel = require("../../../DB/models/user.model.js");

const bcrypt = require("bcrypt");

module.exports.index = (req, res, next) => {
  res.render("index.ejs", { loggedIn: false });
};

module.exports.login = (req, res, next) => {
  res.render("login.ejs", { error: req.query.error, loggedIn: false });
};

module.exports.register = (req, res, next) => {
  res.render("register.ejs", { error: req.query.error, loggedIn: false });
};

module.exports.user = (req, res, next) => {
  const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`;

  res.render("user.ejs", {
    loggedIn: req.session.loggedIn,
    session: req.session,
    url,
  });
};

module.exports.handleRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return res.redirect("/register?error=userExist");
  }

  const hashPassword = bcrypt.hashSync(password, 8);
  await userModel.create({ name, email, password: hashPassword });
  res.redirect("/login");
};

module.exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (!userExist || !bcrypt.compareSync(password, userExist.password)) {
    return res.redirect("/login?error=user not found or invalid password");
  }

  req.session.userId = userExist._id;
  req.session.name = userExist.name;
  req.session.loggedIn = true;

  res.redirect("/message");
};

module.exports.logout = async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
};
