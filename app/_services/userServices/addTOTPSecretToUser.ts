"use server";
import PrismaSingleton from "@/app/_utils/prisma";

export async function addTOTPSecretToUser(userId: number, secret: string) {
  const prisma = new PrismaSingleton();

  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      TOTPSecret: secret,
    },
  });
}
