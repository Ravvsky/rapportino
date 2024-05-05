"use server";
import { PrismaClient } from "@prisma/client";

export async function getUser(email: string) {
  const prisma = new PrismaClient();

  return await prisma.user.findFirst({ where: { email: email } });
}
