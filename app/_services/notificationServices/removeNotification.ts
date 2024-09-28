"use server";
import prisma from "@/app/_utils/prisma";

const removeNotification = async (id) => {
  return await prisma.notification.delete({
    where: { id: id },
  });
};

export default removeNotification;
