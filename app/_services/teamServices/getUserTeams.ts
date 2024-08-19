"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function getUserTeams() {
  const userID = await getLoggedUserID();
  return await prisma.team.findMany({
    where: {
      members: {
        some: {
          userId: userID,
        },
      },
    },
    include: {
      members: true,
    },
  });
}
