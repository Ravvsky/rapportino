import { getTeamByID } from "@/app/_services/teamServices/getTeamByID";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import sendEmail from "@/app/_actions/sendEmail";
import AddMemberDialog from "../../_components/AddMemberDialog";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = async ({ params }: { params: { slug: string } }) => {
  const teamID = +params.slug.split("-")[1];
  const team = await getTeamByID(teamID).catch(() => {
    notFound();
  });
  const userID = await getLoggedUserID();
  return (
    <div className="flex min-h-screen w-full flex-col container gap-6 ">
      <AddMemberDialog teamID={teamID} ownerID={userID} />
      {team?.members.map((member, index) => {
        return (
          <div className="flex flex-col gap-6" key={index}>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {member.name ? member.name : member.email}
                </p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {index < team.members.length - 1 && <Separator />}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
