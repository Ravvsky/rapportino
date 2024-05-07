"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { handleLogin } from "../_actions/handleLogin";
import validateTOTPToken from "../_actions/validateTOTPToken";
import { useState } from "react";
const InputOTPForm = () => {
  const [isCodeWrong, setIsCodeWrong] = useState(false);
  const [OTPInputValue, setOTPInputValue] = useState("");

  return (
    <div className="flex flex-col  gap-4">
      <h1 className="text-2xl font-medium">Two-factor authentication</h1>
      <p className="text-sm text-muted-foreground">
        Your account has enabled two factor authentication.
      </p>
      <p>Enter code from your authenticator app to login</p>

      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          onChange={(value) => {
            setOTPInputValue(value), setIsCodeWrong(false);
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {isCodeWrong && (
        <p className="p-0 text-sm text-muted-foreground text-red-700">
          Code you enetered is wrong.
        </p>
      )}
      <Button
        type="button"
        variant="default"
        className="p-0"
        onClick={() => {
          validateTOTPToken(undefined, OTPInputValue, true).then((res) => {
            if (res !== null) {
              handleLogin(
                JSON.stringify({
                  is2FAEnabled: true,
                })
              );
            } else {
              setIsCodeWrong(true);
            }
          });
        }}
      >
        Verify
      </Button>
    </div>
  );
};
export default InputOTPForm;
