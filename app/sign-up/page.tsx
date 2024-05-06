"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import loginImage from "@/assets/images/image.png";
import Image from "next/image";
import Link from "next/link";
import { getUser } from "../_services/userServices/getUser";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createUser } from "../_services/userServices/createUser";

const Page = () => {
  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(false);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const formSubmitHandler = async (
    values: { email: any; password: any },
    actions: FormikHelpers<{ email: string; password: string }>
  ) => {
    const { email, password } = values;
    actions.validateForm();
    if (email === "") {
      return;
    }
    if (isPasswordFieldVisible) {
      createUser(email, password);
      setIsAccountCreated(true);
    } else {
      if (email !== null && email !== undefined) {
        const userExists = await getUser(email);
        if (userExists) {
          actions.setFieldError(
            "email",
            "Account associated with this e-mail already exists"
          );
        } else {
          setIsPasswordFieldVisible(true);
        }
      }
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.lazy(() => {
      if (isPasswordFieldVisible) {
        return Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters long")
          .matches(
            /^(?=.*[a-z])/,
            "Password must contain at least one lowercase letter"
          )
          .matches(
            /^(?=.*[A-Z])/,
            "Password must contain at least one uppercase letter"
          )
          .matches(/^(?=.*\d)/, "Password must contain at least one digit")
          .matches(
            /^(?=.*[@$!%*?&.])/,
            "Password must contain at least one special character"
          );
      }

      return Yup.string().notRequired();
    }),
  });
  return (
    <div className="h-screen flex justify-center dark ">
      <div className=" bg-neutral-900 flex flex-col justify-center flex-1 items-center">
        <Image src={loginImage} alt="" priority={true} />
      </div>
      <div className=" flex flex-col justify-center items-center flex-1   ">
        {!isAccountCreated && (
          <div className="flex flex-col gap-4 w-[350px] ">
            <h1 className="text-2xl font-medium">Create account!</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create new account
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, actions) => formSubmitHandler(values, actions)}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col gap-4">
                  <Field
                    name="email"
                    placeholder="Email"
                    type="email"
                    as={Input}
                  ></Field>
                  {errors.email && touched.email ? (
                    <p className="p-0 text-sm text-muted-foreground text-red-700">
                      {errors.email}
                    </p>
                  ) : null}
                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                    as={Input}
                    className={`${isPasswordFieldVisible ? "" : "hidden"}`}
                  ></Field>
                  {errors.password && touched.password ? (
                    <p className="p-0 text-sm text-muted-foreground text-red-700">
                      {errors.password}
                    </p>
                  ) : null}
                  <Button type="submit">Continue</Button>
                </Form>
              )}
            </Formik>
            <div className="flex gap-2 items-center justify-center">
              <Separator className=" shrink" />
              <p className="shrink-0 uppercase text-xs py-2 text-muted-foreground">
                or continue with
              </p>
              <Separator className=" shrink" />
            </div>
            <Button type="button" variant="secondary">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <p className="p-0 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href={"/login"}>
                <Button type="button" variant="link" className="p-0 ">
                  Log in!
                </Button>
              </Link>
            </p>
          </div>
        )}
        {isAccountCreated && (
          <div className="flex flex-col gap-6 w-[350px] ">
            <h1 className="text-2xl font-medium">Congratulations!</h1>
            <p className="text-sm text-muted-foreground">
              Your account has been successfuly created. You can now login.
            </p>

            <Link href="/login">
              <Button type="button" variant="secondary" className="w-full">
                Continue
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
