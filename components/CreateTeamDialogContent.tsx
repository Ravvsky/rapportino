"use client";
import { Label } from "./ui/label";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { createTeam } from "@/app/_services/teamServices/createTeam";
import { useToast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { Input } from "./ui/input";

const CreateTeamDialogContent = ({
  onIsOpenChange,
}: {
  onIsOpenChange: () => void;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const formCreateTeamHandler = async (
    values: { name: string },
    actions: FormikHelpers<{ name: string }>
  ) => {
    const { name } = values;
    actions.validateForm();

    createTeam(name)
      .then((res) => {
        setOpen(!open);
        if (pathname.includes("teams")) {
          router.refresh();
        }
        onIsOpenChange();
        toast({
          title: "Team created successfully",
        });
      })
      .catch((err) => {
        actions.setFieldError(
          "name",
          "Something went wrong. Please try again."
        );
      });
  };
  const teamFormSchema = Yup.object().shape({
    name: Yup.string().required("Team name cannot be empty."),
  });
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create new team</DialogTitle>
        <DialogDescription>Create your new team here.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div>
          <Formik
            initialValues={{ name: "" }}
            validateOnBlur={false}
            validationSchema={teamFormSchema}
            onSubmit={(values, actions) =>
              formCreateTeamHandler(values, actions)
            }
          >
            {({ errors, touched }) => {
              return (
                <Form className="flex flex-col gap-4 items-baseline">
                  <Label htmlFor="name" className="text-right">
                    Team name
                  </Label>
                  <Field name="name" type="text" as={Input}></Field>
                  {errors.name && touched.name ? (
                    <p className="p-0 text-sm text-muted-foreground text-red-700">
                      {errors.name}
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
      </div>
    </DialogContent>
  );
};

export default CreateTeamDialogContent;
