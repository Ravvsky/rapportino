import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserTeam } from "../_services/teamServices/getUserTeam";
import Link from "next/link";
import CreateTeamDialog from "./_components/CreateTeamDialog";

const Page = async () => {
  const teamsList = await getUserTeam();
  console.log(teamsList);

  return (
    <>
      {teamsList.length > 0 && (
        <div className="container grid grid-cols-3 gap-4 p-4 md:p-10 md:pl-20">
          {teamsList.map((team, i) => {
            return (
              <Link key={i} href={`/teams/${team.name}-${team.id}`}>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      {teamsList.length === 0 && <CreateTeamDialog />}
    </>
  );
};
<span>New Team</span>;
export default Page;
