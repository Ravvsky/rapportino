"use server";
// import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function addUserToTeam(userId: string, teamId: number) {
  console.log(teamId);
  await prisma.userTeam.create({
    data: {
      userId: userId,
      teamId: teamId,
      isInvited: false,
    },
  });
}
