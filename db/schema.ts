import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const subscriber = pgTable("subscriber", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull(),
  sequenceStep: integer("sequence_step").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const order = pgTable("order", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  briefSlug: text("brief_slug").notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  provider: text("provider").notNull(),
  providerRef: text("provider_ref"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const commissionRequest = pgTable("commission_request", {
  id: uuid("id").defaultRandom().primaryKey(),
  project: text("project").notNull(),
  deadline: text("deadline").notNull(),
  budget: text("budget").notNull(),
  question: text("question").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
