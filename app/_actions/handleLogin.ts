"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt } from "../_utils/crypto";
import { redirect } from "next/navigation";
export async function handleLogin(sessionData: string) {
  const encryptedUser = cookies().get("token")?.value;
  const decryptedUser = encryptedUser && (await decrypt(encryptedUser));
  const sessionDataObj = JSON.parse(sessionData);
  const userObj = decryptedUser && JSON.parse(decryptedUser);
  const objectToEncrypt = {
    is2FAEnabled: sessionDataObj.is2FAEnabled,
    userID: userObj.user,
  };
  const encryptedSessionData = await encrypt(JSON.stringify(objectToEncrypt));

  cookies().set("user", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/profile");
}
