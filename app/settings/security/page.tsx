import TwoFactorCard from "@/components/TwoFactorCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import crypto from "crypto";
import base32 from "hi-base32";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_utils/crypto";

const Page = async () => {
  function generateRandomSecret(length = 20) {
    return base32.encode(crypto.randomBytes(length)).replace(/=/g, "");
  }
  const secret = generateRandomSecret();
  let totp = new OTPAuth.TOTP({
    issuer: "Rapportino App",
    label: "Rapportino",
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });

  let uri = totp.toString();

  const generateQR = async (text: string) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error(err);
    }
  };
  const qrcode = await generateQR(uri);
  const encryptedUser = cookies().get("user")?.value;
  const decryptedUser = encryptedUser && (await decrypt(encryptedUser));
  if (!decryptedUser) {
    return;
  }

  const is2FAEnabled = JSON.parse(decryptedUser).is2FAEnabled;
  return (
    <div className="grid gap-6 ">
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Two factor authentication</CardTitle>
          <CardDescription>
            {!is2FAEnabled
              ? ` Protect your account with an extra layer of security! Enable
            Two-Factor Authentication (2FA) now to safeguard your data.`
              : "You have already enabled two factor authentication"}
          </CardDescription>
        </CardHeader>
        {qrcode && (
          <TwoFactorCard
            qrCodeImage={qrcode}
            secret={secret}
            is2FAEnabled={is2FAEnabled}
          />
        )}
      </Card>
    </div>
  );
};
export default Page;
