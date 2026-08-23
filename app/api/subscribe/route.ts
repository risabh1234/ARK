import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { subscriber } from "@/db/schema";
import { sendPrimerLetter } from "@/lib/resend";
import { isSameOrigin } from "@/lib/same-origin";

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().min(1).max(64),
});

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const { email, source } = parsed.data;
  const db = getDb();

  if (db) {
    await db.insert(subscriber).values({ email, source }).onConflictDoNothing();
  } else {
    console.warn("[subscribe] DATABASE_URL not set — skipping persistence for", email);
  }

  try {
    await sendPrimerLetter(email);
  } catch (err) {
    console.error("[subscribe] failed to send Primer letter", err);
  }

  return NextResponse.json({ ok: true });
}
