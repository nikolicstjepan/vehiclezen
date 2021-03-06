const crypto = require("crypto");

module.exports = Object.freeze({
  makeHash: (text) => crypto.createHash("md5").update(text, "utf-8").digest("hex"),
});
