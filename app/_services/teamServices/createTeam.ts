"use server";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";

export async function createTeam(name: string) {
  const userID = await getLoggedUserID();
  console.log(userID);
  return await prisma.team.create({
    data: {
      name: name,
      owners: { connect: [{ id: userID }] },
      members: { connect: [{ id: userID }] },
    },
  });
}
