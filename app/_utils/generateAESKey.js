const crypto = require("crypto");

function generateAESKey(length) {
  return crypto.randomBytes(Math.ceil(length / 8)).toString("hex");
}

const aesKey = generateAESKey(256);
const salt = crypto.randomBytes(16).toString("hex");
console.log("AES Key:", aesKey);
console.log("Salt:", salt);
