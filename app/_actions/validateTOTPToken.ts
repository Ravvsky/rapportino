"use server";
import * as OTPAuth from "otpauth";
import { addTOTPSecretToUser } from "../_services/userServices/addTOTPSecretToUser";
import { decrypt } from "../_utils/crypto";
import { cookies } from "next/headers";

const validateTOTPToken = async (
  secret: string,
  token: string,
  isLogin: boolean
) => {
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && (await decrypt(encryptedUser));

  const user = decryptedUser && JSON.parse(decryptedUser).userID;
  console.log("USER ID ", user);
  let totp = new OTPAuth.TOTP({
    // Provider or service the account is associated with.
    issuer: "Rapportino App",
    // Account identifier.
    label: "Rapportino",
    // Algorithm used for the HMAC function.
    algorithm: "SHA1",
    // Length of the generated tokens.
    digits: 6,
    // Interval of time for which a token is valid, in seconds.
    period: 30,
    // Arbitrary key encoded in Base32.
    secret: OTPAuth.Secret.fromBase32(secret), // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
  });
  const delta = totp.validate({ token, window: 1 });
  console.log(delta);
  if (delta !== null) {
    return isLogin ? true : addTOTPSecretToUser(user, secret);
  } else {
    return null;
  }
};
export default validateTOTPToken;
