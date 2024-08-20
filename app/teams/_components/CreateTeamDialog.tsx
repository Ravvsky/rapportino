"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import teamImage from "@/assets/images/team.png";
import CreateTeamDialogContent from "@/components/CreateTeamDialogContent";
import { useState } from "react";

const CreateTeamDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="container gap-8 flex grow flex-col justify-center h-full items-center">
        <Image src={teamImage} alt={""} className="w-[40%]" />
        <div className="text-2xl font-medium">There is no team</div>
        <DialogTrigger className="flex" asChild>
          <Button variant={"secondary"}>Create team</Button>
        </DialogTrigger>
        <CreateTeamDialogContent
          onIsOpenChange={() => {
            setOpen(!open);
          }}
        />
      </div>
    </Dialog>
  );
};

export default CreateTeamDialog;
