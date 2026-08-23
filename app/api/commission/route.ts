import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { commissionRequest } from "@/db/schema";
import { isSameOrigin } from "@/lib/same-origin";

const bodySchema = z.object({
  project: z.string().min(1).max(280),
  deadline: z.string().min(1).max(120),
  budget: z.string().min(1).max(60),
  question: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }

  const db = getDb();
  if (db) {
    await db.insert(commissionRequest).values(parsed.data);
  } else {
    console.warn("[commission] DATABASE_URL not set — skipping persistence", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
