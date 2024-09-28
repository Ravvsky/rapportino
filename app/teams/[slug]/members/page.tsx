import { getTeamByID } from "@/app/_services/teamServices/getTeamByID";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddMemberDialog from "../../_components/AddMemberDialog";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>Change</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit member</DialogTitle>
                      <DialogDescription>
                        Make changes to your team member here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Role
                        </Label>

                        <Select>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue
                              placeholder={
                                member.role.charAt(0).toUpperCase() +
                                member.role.slice(1).toLowerCase()
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right hidden">
                          Remove member
                        </Label>
                        <Button
                          className="col-span-3 text-right col-start-2 "
                          variant={"destructive"}
                        >
                          Remove member
                        </Button>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
const formatRole = (role: string) => {
  return role.charAt(0) + role.slice(1).toLowerCase();
};
