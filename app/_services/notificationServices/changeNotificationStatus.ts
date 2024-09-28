"use server";
import prisma from "@/app/_utils/prisma";

const changeNotificationStatus = async (id: number) => {
  return await prisma.notification.update({
    where: { id: id },
    data: { isRead: true },
  });
};

export default changeNotificationStatus;
