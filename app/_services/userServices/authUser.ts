"use server";
import { PrismaClient } from "@prisma/client";
import { createHash } from "crypto";

export async function authUser(email: string, password: string) {
  const prisma = new PrismaClient();
  const hash = createHash("sha256");
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  return await prisma.user.findFirst({
    where: { email: email, password: hashedPassword },
  });
}
