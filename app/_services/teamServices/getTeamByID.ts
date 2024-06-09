import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import prisma from "@/app/_utils/prisma";
import { cache } from "react";

export const getTeamByID = cache(async (id: number) => {
  const userId = await getLoggedUserID();
  console.log(new Date());
  return await prisma.team.findFirst({
    where: {
      id: id,
      AND: [
        {
          OR: [
            { owners: { some: { id: userId } } },
            { members: { some: { id: userId } } },
          ],
        },
      ],
    },
    include: {
      owners: true,
      members: true,
    },
  });
});
