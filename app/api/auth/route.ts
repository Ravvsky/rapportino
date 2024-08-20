import { handleLogin } from "@/app/_actions/handleLogin";
import { auth } from "@/auth";
import crypto from "crypto";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/_utils/prisma";
import { AdapterUser } from "@auth/core/adapters";

export interface ExtendedAdapterUser extends AdapterUser {
  password: string;
}
export async function GET(request: Request) {
  const userInfo = await auth();
  if (!userInfo?.user) {
    throw new Error("User information is not available");
  }
  const user = userInfo.user as ExtendedAdapterUser;
  const adapter = await PrismaAdapter(prisma);

  if (!adapter.getUserByEmail || !adapter.createUser) {
    throw new Error(
      "getUserByEmail or createUser method is not defined in adapter"
    );
  }
  const isUserInDatabase = await adapter.getUserByEmail(user.email!);

  const password = crypto.randomBytes(Math.ceil(32)).toString("hex");

  if (!isUserInDatabase) {
    user.password = password;

    await adapter.createUser(user);
    return await handleLogin(JSON.stringify(user?.id));
  }
  return await handleLogin(JSON.stringify(isUserInDatabase?.id));
}
