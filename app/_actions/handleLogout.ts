"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function handleLogout() {
  cookies().delete("user");
  await signOut();
  redirect("/login");
}
