"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function getUserTeam() {
  const userID = await getLoggedUserID();
  return await prisma.team.findMany({
    where: {
      OR: [
        { owners: { some: { id: userID } } },
        { members: { some: { id: userID } } },
      ],
    },
    include: {
      owners: true,
      members: true,
    },
  });
}
