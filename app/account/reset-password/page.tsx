import type { Metadata } from "next";
import { Eyebrow } from "@/components/Primitives";
import { ChangePasswordForm } from "@/components/account/SettingsForms";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div className="max-w-[480px]">
      <Eyebrow>Account</Eyebrow>
      <h1 className="mt-16 font-serif text-h1 font-light text-ink">Set a new password</h1>
      <div className="mt-32">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
