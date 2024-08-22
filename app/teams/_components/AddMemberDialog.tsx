"use client";

import sendEmail from "@/app/_actions/sendEmail";
import { createNotification } from "@/app/_services/notificationServices/createNotification";
import { addUserToTeam } from "@/app/_services/teamServices/addUserToTeam";
import { getUserByEmail } from "@/app/_services/userServices/getUserByEmail";
import { useSocket } from "@/app/context/SocketContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Field, Form, Formik, FormikProps, FormikValues } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
const AddMemberDialog = ({
  teamID,
  ownerID,
}: {
  teamID: number;
  ownerID: string;
}) => {
  const [open, setOpen] = useState(false);

  const formRef = useRef<FormikProps<{ email: string; role: string }>>(null);
  const { socket } = useSocket();

  const { toast } = useToast();
  const submitFormHandler = async (values: any, actions: any) => {
    actions.validateForm();

    const invitedUserEmail = values.email;

    if (!formRef.current?.isValid) {
      return;
    }
    const invitedUserID = await getUserByEmail(invitedUserEmail);
    if (invitedUserID?.id) {
      await sendEmail(teamID, ownerID, invitedUserEmail).then(async (res) => {
        if (res) {
          setOpen(!open);
          await addUserToTeam(invitedUserID?.id, teamID);
          createNotification(invitedUserID?.id, "title", "description", "url");
          socket.emit(
            "notification",
            `You have been invited to ${teamID}`,
            invitedUserID?.id
          );

          toast({ title: "Your invitation has been send succesfuly." });
        } else {
          actions.setFieldError(
            "email",
            "Account with that email doesn't exists."
          );
        }
      });
    } else {
      actions.setFieldError("email", "Account with that email doesn't exists.");
    }
  };
  const addMemberFormSchema = Yup.object().shape({
    email: Yup.string()
      .required("Team name cannot be empty.")
      .email("Input correct email."),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-min" type="submit">
          Add member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Formik
            initialValues={{ email: "", role: "user" }}
            onSubmit={(values, actions) => {
              submitFormHandler(values, actions);
            }}
            validationSchema={addMemberFormSchema}
            innerRef={formRef}
          >
            {({ errors, touched }) => {
              return (
                <Form className="flex flex-col gap-4 items-baseline">
                  <Label htmlFor="name" className="text-right">
                    Team name
                  </Label>
                  <Field name="email" type="text" as={Input}></Field>
                  {errors.email && touched.email ? (
                    <p className="p-0 text-sm text-muted-foreground text-red-700">
                      {errors.email}
                    </p>
                  ) : null}

                  <DialogFooter className="self-end	">
                    <Button type="submit">Create team</Button>
                  </DialogFooter>
                </Form>
              );
            }}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddMemberDialog;
