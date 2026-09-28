import { render } from "@react-email/components";
import { ResetPassword } from "../../../emails/reset-password";
import { VerifyEmail } from "../../../emails/verify-email";
import { sendEmail } from "./plunk";

const APP_NAME = "Aurlixa";

export async function sendVerificationEmail({
  user,
  url,
}: {
  user: { name: string; email: string };
  url: string;
}) {
  const html = await render(
    <VerifyEmail name={firstName(user.name)} url={url} />
  );
  await sendEmail({
    to: user.email,
    subject: `${APP_NAME} — E-posta adresinizi doğrulayın`,
    html,
  });
}

export async function sendResetPasswordEmail({
  user,
  url,
}: {
  user: { name: string; email: string };
  url: string;
}) {
  const html = await render(
    <ResetPassword name={firstName(user.name)} url={url} />
  );
  await sendEmail({
    to: user.email,
    subject: `${APP_NAME} — Şifre sıfırlama talebi`,
    html,
  });
}

function firstName(fullName: string) {
  return fullName.split(" ")[0] || "değerli müşterimiz";
}
