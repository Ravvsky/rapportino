import { cookies } from "next/headers";
import { decrypt } from "../_utils/crypto";

const Page = async () => {
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && (await decrypt(encryptedUser));
  if (!decryptedUser) {
    return;
  }
  const user = JSON.parse(decryptedUser).userID;

  return <div></div>;
};

export default Page;
