"use server";
import { PrismaClient } from "@prisma/client";

export async function addTOTPSecretToUser(userId: number, secret: string) {
  const prisma = new PrismaClient();

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      TOTPSecret: secret,
    },
  });
}
