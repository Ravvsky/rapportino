"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import loginImage from "@/assets/images/image.png";
import Image from "next/image";
import Link from "next/link";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { authUser } from "../_services/userServices/authUser";
import { handleLogin } from "../_actions/handleLogin";

import InputOTPForm from "./InputOTPForm";
import loginWithGoogle from "../_actions/loginWithGoogle";

const Page = () => {
  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(false);
  const [is2FAEnable, setIs2FAEnabled] = useState(false);

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
      if (email !== null && email !== undefined) {
        await authUser(email, password).then((res) => {
          console.log(res);
          if (res) {
            if (!res.TOTPSecret) {
              handleLogin(
                JSON.stringify({
                  userID: res.id,
                  is2FAEnabled: false,
                })
              );
            } else if (res.TOTPSecret) {
              setIs2FAEnabled(true);
            }
          } else {
            actions.setStatus("auth_failed");
          }
        });
      }
    } else {
      setIsPasswordFieldVisible(true);
    }
  };
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.lazy(() => {
      if (isPasswordFieldVisible) {
        return Yup.string().required("Password is required");
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
        {!is2FAEnable && (
          <div className="flex flex-col gap-4 w-[350px] ">
            <h1 className="text-2xl font-medium">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, actions) => formSubmitHandler(values, actions)}
            >
              {({ errors, touched, status }) => (
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

                  {status === "auth_failed" && (
                    <p className="p-0 text-sm text-muted-foreground text-red-700">
                      Wrong password or e-mail address
                    </p>
                  )}
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
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                loginWithGoogle();
              }}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <p className="p-0 text-sm text-muted-foreground">
              Don&apos;t have an account?
              <Link href={"/sign-up"}>
                <Button type="button" variant="link" className="p-0 ">
                  Sign up!
                </Button>
              </Link>
            </p>
          </div>
        )}
        {is2FAEnable && <InputOTPForm />}
      </div>
    </div>
  );
};

export default Page;
