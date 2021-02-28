const jwt = require("jsonwebtoken");

module.exports = Object.freeze({
  sign: (data) => jwt.sign(data, process.env.SECRET || "shhhhh"),
  verify: (token) => jwt.verify(token, process.env.SECRET || "shhhhh"),
});
