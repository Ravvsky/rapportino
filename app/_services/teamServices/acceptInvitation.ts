"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function acceptInvitation(teamId: number) {
  const userID = await getLoggedUserID();
  return await prisma.userTeam.updateMany({
    where: {
      userId: userID,
      teamId: teamId,
      isInvited: true,
    },
    data: {
      isInvited: false,
    },
  });
}
