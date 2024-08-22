"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function cancelInvitation(teamID: number, userID?: string) {
  const finalUserID = userID || (await getLoggedUserID());

  console.log(teamID);
  return await prisma.userTeam.deleteMany({
    where: {
      teamId: teamID,
      userId: finalUserID,
    },
  });
}
