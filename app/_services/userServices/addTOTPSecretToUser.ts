"use server";
import prisma from "@/app/_utils/prisma";

export async function addTOTPSecretToUser(userId: string, secret: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      TOTPSecret: secret,
    },
  });
}
