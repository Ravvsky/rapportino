"use server";

import { cookies } from "next/headers";
import { decrypt } from "../_utils/crypto";

const getLoggedUserID = async () => {
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && (await decrypt(encryptedUser));
  const user = decryptedUser && JSON.parse(decryptedUser).userID;
  return user;
};

export default getLoggedUserID;
