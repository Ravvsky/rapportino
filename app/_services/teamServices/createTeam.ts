"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function createTeam(name: string) {
  const userID = await getLoggedUserID();
  return await prisma.team.create({
    data: {
      name: name,
      members: {
        create: [
          {
            userId: userID,
            role: "MANAGER",
            isInvited: false,
          },
        ],
      },
    },
  });
}
