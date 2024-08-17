const { Router } = require("express");
const MC = require("./message.controller.js");
const messageRouter = Router();

messageRouter.get("/message", MC.message);

messageRouter.post("/sendMsg/:id" , MC.sendMsg)

module.exports = messageRouter;
