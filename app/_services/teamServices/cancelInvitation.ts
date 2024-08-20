"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function cancelInvitation(userID?: string) {
  const finalUserID = userID || (await getLoggedUserID());
  const userTeam = await prisma.userTeam.findFirst({
    where: {
      userId: finalUserID,
    },
  });

  if (userTeam) {
    return await prisma.userTeam.delete({
      where: {
        id: userTeam.id,
      },
    });
  }
}
