"use server";
import { encrypt } from "@/app/_utils/crypto";
import prisma from "@/app/_utils/prisma";
import { createHash } from "crypto";
import { cookies } from "next/headers";

export async function authUser(email: string, password: string) {
  const hash = createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  const user = await prisma.user.findFirst({
    where: { email: email, password: hashedPassword },
  });
  if (user?.TOTPSecret) {
    const encryptedSessionData = await encrypt(
      JSON.stringify({ user: user?.id, token: user?.TOTPSecret })
    );
    cookies().set("token", encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      path: "/",
    });
  }
  return {
    id: user?.id,
    email: user?.email,
    TOTPSecret: Boolean(user?.TOTPSecret),
  };
}
