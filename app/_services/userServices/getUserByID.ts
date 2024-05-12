"use server";
import prisma from "@/app/_utils/prisma";

export async function getUserByID(id: string) {
  return await prisma.user.findFirst({ where: { id: id } });
}
