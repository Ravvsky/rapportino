"use server";
import prisma from "@/app/_utils/prisma";

export async function createNotification(
  userId: string,
  title: string,
  description: string,
  url: string
) {
  return prisma.$transaction(async (prisma) => {
    const currentNotificationsCount = await prisma.notification.count({
      where: {
        userId: userId,
      },
    });

    if (currentNotificationsCount > 4) {
      const oldestNotification = await prisma.notification.findFirst({
        where: {
          userId: userId,
        },
        orderBy: {
          id: "asc",
        },
      });

      if (oldestNotification) {
        await prisma.notification.delete({
          where: {
            id: oldestNotification.id,
          },
        });
      }
    }

    await prisma.notification.create({
      data: {
        title: title,
        description: description,
        url: url,
        userId: userId,
      },
    });
  });
}
