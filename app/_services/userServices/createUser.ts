"use server";
import prisma from "@/app/_utils/prisma";
import { createHash } from "crypto";

export async function createUser(email: string, password: string) {
  const hash = createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");

  return await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
}
