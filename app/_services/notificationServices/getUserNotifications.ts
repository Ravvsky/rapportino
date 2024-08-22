"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function getUserNotification() {
  const userId = await getLoggedUserID();

  return await prisma.notification.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });
}
