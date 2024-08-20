import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";
import { getUserByID } from "../userServices/getUserByID";

export async function getTeamByID(id: number) {
  const userId = await getLoggedUserID();
  const team = await prisma.team.findFirst({
    where: {
      id: id,
      AND: [
        {
          members: {
            some: {
              userId: userId,
            },
          },
        },
      ],
    },
    include: {
      members: true,
    },
  });
  if (!team) {
    return null;
  }
  const membersWithUserData = await Promise.all(
    team.members.map(async (member) => {
      const userData = await getUserByID(member.userId);
      return { ...member, email: userData?.email, name: userData?.name };
    })
  );

  return {
    ...team,
    members: membersWithUserData,
  };
}
