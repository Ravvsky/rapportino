"use server";
import prisma from "@/app/_utils/prisma";
import PrismaSingleton from "@/app/_utils/prisma";

export async function getUser(email: string) {
  return await prisma.user.findFirst({ where: { email: email } });
}
