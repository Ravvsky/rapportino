import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserTeams } from "../_services/teamServices/getUserTeams";
import Link from "next/link";
import CreateTeamDialog from "./_components/CreateTeamDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TeamPendingInvitation from "./_components/TeamPendingInvitation";
import getLoggedUserID from "../_actions/getLoggedUserID";
import { Team, UserTeam } from "@prisma/client";

const Page = async () => {
  const teamsList = await getUserTeams();
  const userId = await getLoggedUserID();
  const [invitationsPresent, invitationsAbsent] = teamsList.reduce<
    [Team[], Team[]]
  >(
    ([present, absent], item) => {
      const isInvited = item.members.find(
        (member) => member.userId === userId
      )?.isInvited;
      if (isInvited) {
        present.push(item);
      } else {
        absent.push(item);
      }
      return [present, absent];
    },
    [[], []]
  );

  return (
    <>
      {teamsList.length > 0 && (
        <div className="container  grid-cols-3 gap-4 p-4 md:p-10 md:pl-20 flex flex-col">
          {invitationsAbsent.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Your teams
              </h2>
              {invitationsAbsent.map((team, i) => (
                <Link key={i} href={`/teams/${team.name}-${team.id}`}>
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>{team.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </>
          )}
          {invitationsPresent.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Pending invitations
              </h2>
              {invitationsPresent.map((team, i) => (
                <TeamPendingInvitation
                  teamName={team.name}
                  teamID={team.id}
                  key={i}
                />
              ))}
            </>
          )}
        </div>
      )}
      {teamsList.length === 0 && <CreateTeamDialog />}
    </>
  );
};
<span>New Team</span>;
export default Page;
