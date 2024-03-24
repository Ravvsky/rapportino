"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import xd from "@/assets/images/image.png";
import Image from "next/image";
import Link from "next/link";
import { handleLogin } from "../_actions/handleLogin";
const Page = () => {
  const [isPasswordFieldVisible, setIsPasswordFieldVisible] = useState(false);
  const formSubmitHandler = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (isPasswordFieldVisible) {
      console.log(email, password);
      handleLogin(JSON.stringify({ email: email, password: password }));

      console.log("dupa");
    } else {
      setIsPasswordFieldVisible(true);
    }
  };
  return (
    <div className="h-screen flex justify-center dark ">
      <div className=" bg-neutral-900 flex flex-col justify-center flex-1 items-center">
        <Image src={xd} alt="" priority={true} />
      </div>
      <div className=" flex flex-col justify-center items-center flex-1   ">
        <div className="flex flex-col gap-4 w-[350px] ">
          <h1 className="text-2xl font-medium">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login
          </p>
          <form className="flex flex-col gap-4" onSubmit={formSubmitHandler}>
            <Input type="email" id="email" placeholder="Email" name="email" />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={`${isPasswordFieldVisible ? "" : "hidden"}`}
            />
            <Button type="submit">Continue</Button>
          </form>
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
            Don&apos;t have an account?{" "}
            <Link href={"#"}>
              <Button type="button" variant="link" className="p-0 ">
                Sign up!
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
