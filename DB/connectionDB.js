const mongoose = require('mongoose')

const connectionDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/SarahaApp")
    .then(() => {
      console.log("connected to data base");
    })
    .catch((err) => {
      console.log("connected to data base faild");
    });
};

module.exports = connectionDB;