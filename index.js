const express = require("express");
const connectionDB = require("./DB/connectionDB.js");
const userRouter = require("./src/modules/users/user.routes.js");
const messageRouter = require("./src/modules/messages/message.routes.js");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/SarahaApp",
  collection: "mySessions",
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

connectionDB();

app.use(userRouter);
app.use(messageRouter);

app.get("*", (req, res) => res.send("404 page not found"));
app.listen(port, () => console.log(`app listening on port ${port}!`));
