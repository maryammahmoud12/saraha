const { Router } = require("express");
const UC = require("./user.controller.js");

const userRouter = Router();

userRouter.get("/", UC.index);

userRouter.get("/login", UC.login);

userRouter.get("/register", UC.register);

userRouter.get("/user/:id", UC.user);

userRouter.post("/handleRegister", UC.handleRegister);

userRouter.post("/handleLogin", UC.handleLogin);

userRouter.get("/logout", UC.logout);

module.exports = userRouter;
