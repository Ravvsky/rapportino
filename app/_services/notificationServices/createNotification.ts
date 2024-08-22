"use server";
import prisma from "@/app/_utils/prisma";

export async function createNotification(
  userId: string,
  title: string,
  description: string,
  url: string
) {
  return await prisma.notification.create({
    data: {
      title: title,
      description: description,
      url: url,
      userId: userId,
    },
  });
}
