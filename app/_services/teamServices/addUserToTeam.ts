"use server";
import prisma from "@/app/_utils/prisma";

export async function addUserToTeam(userId: string, teamId: number) {
  try {
    const result = await prisma.userTeam.create({
      data: {
        userId: userId,
        teamId: teamId,
        isInvited: true,
      },
    });
    return result;
  } catch (err) {
    return {
      error: err.code || "An error occurred while adding user to the team",
    };
  }
}
