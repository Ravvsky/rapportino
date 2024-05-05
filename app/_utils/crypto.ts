"use server";
const crypto = require("crypto");

const AES_KEY = process.env.AES_KEY;
const SALT = process.env.SALT;

export async function encrypt(text: string) {
  if (!AES_KEY || !SALT) {
    throw new Error("AES key or salt not provided.");
  }

  const key = crypto.scryptSync(AES_KEY, SALT, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export async function decrypt(text: string) {
  if (!AES_KEY || !SALT) {
    throw new Error("AES key or salt not provided.");
  }

  const key = crypto.scryptSync(AES_KEY, SALT, 32);
  const parts = text.split(":");
  if (parts.length !== 2) {
    throw new Error("Invalid encrypted text format.");
  }
  const iv = Buffer.from(parts.shift() || "", "hex"); // Handle possible undefined
  const encryptedText = Buffer.from(parts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString();
}
