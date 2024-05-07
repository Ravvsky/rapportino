"use server";
import prisma from "@/app/_utils/prisma";
import PrismaSingleton from "@/app/_utils/prisma";

export async function addTOTPSecretToUser(userId: number, secret: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      TOTPSecret: secret,
    },
  });
}
