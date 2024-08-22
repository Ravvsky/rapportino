"use client";

import { acceptInvitation } from "@/app/_services/teamServices/acceptInvitation";
import { cancelInvitation } from "@/app/_services/teamServices/cancelInvitation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const TeamPendingInvitation = ({
  teamName,
  teamID,
}: {
  teamName: string;
  teamID: number;
}) => {
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger>
        <Card className="col-span-1 cursor-pointer">
          <CardHeader>
            <CardTitle>{teamName}</CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Accept Invitation</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Confirm if you want to join team {teamName}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"destructive"}
              onClick={async () => {
                await cancelInvitation(teamID);
                toast({
                  title: `You declined invitation to team ${teamName}`,
                });
              }}
            >
              Decline
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={async () => {
                await acceptInvitation(teamID);
                toast({ title: `You are now added to team ${teamName}` });
              }}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamPendingInvitation;
