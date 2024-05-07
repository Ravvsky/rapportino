"use server";
import * as OTPAuth from "otpauth";
import { addTOTPSecretToUser } from "../_services/userServices/addTOTPSecretToUser";
import { decrypt } from "../_utils/crypto";
import { cookies } from "next/headers";

const validateTOTPToken = async (
  secret: string | undefined,
  token: string,
  isLogin: boolean
) => {
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && (await decrypt(encryptedUser));
  const encryptedToken = cookies().get("token")?.value;
  const decryptedToken = encryptedToken && (await decrypt(encryptedToken));
  const user = decryptedUser && JSON.parse(decryptedUser).userID;

  secret = secret ? secret : decryptedToken && JSON.parse(decryptedToken).token;

  if (!secret) {
    return;
  }
  let totp = new OTPAuth.TOTP({
    issuer: "Rapportino App",
    label: "Rapportino",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
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
