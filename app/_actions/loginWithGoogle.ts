"use server";
import { signIn } from "@/auth";

const loginWithGoogle = async () => {
  await signIn("google", {
    redirectTo: "/api/auth",
  });
};
export default loginWithGoogle;
