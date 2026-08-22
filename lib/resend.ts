import { Resend } from "resend";

const FROM = "ĀRK <letters@ark.study>";

export async function sendPrimerLetter(email: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const resend = new Resend(key);
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Here is the Primer",
    text: "Fifty questions worth asking. Read them here: https://ark.study/primer\n\nNothing else. — ĀRK",
  });
}
