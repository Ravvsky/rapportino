const crypto = require("crypto");

const secretKey = "secret_key";

export function encrypt(data: string) {
  console.log("Xd");
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(encryptedData: string) {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
