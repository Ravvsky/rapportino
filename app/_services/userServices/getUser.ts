"use server";
import PrismaSingleton from "@/app/_utils/prisma";

export async function getUser(email: string) {
  const prisma = new PrismaSingleton();

  return await prisma.user.findFirst({ where: { email: email } });
}
