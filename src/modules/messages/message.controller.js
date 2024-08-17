const messageModel = require("../../../DB/models/message.model.js");

module.exports.message = async (req, res, next) => {
  if (req.session.loggedIn) {
    const url = `${req.protocol}://${req.headers.host}/user/${req.session.userId}`;

    const message = await messageModel.find({ userId: req.session.userId });

    res.render("messages.ejs", {
      loggedIn: req.session.loggedIn,
      session: req.session,
      url,
      message,
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.sendMsg = async (req, res, next) => {
  await messageModel.create({ userId: req.params.id, content: req.body.msg });
  res.redirect(`/user/${req.params.id}`);
};
