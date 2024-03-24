import { cookies } from "next/headers";
import { decrypt } from "../_utils/crypto";

const Page = () => {
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && decrypt(encryptedUser);
  const user = JSON.parse(decryptedUser).email;

  return <div></div>;
};

export default Page;
