"use server";

import { cookies } from "next/headers";
import { encrypt } from "../_utils/crypto";
import { redirect } from "next/navigation";
export async function handleLogin(sessionData: string) {
  const encryptedSessionData = encrypt(sessionData); // Encrypt your session data
  cookies().set("user", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  redirect("/profile");
}
