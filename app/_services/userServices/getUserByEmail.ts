"use server";
import prisma from "@/app/_utils/prisma";

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({ where: { email: email } });
}
