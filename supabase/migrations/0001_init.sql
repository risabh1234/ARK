create extension if not exists "pgcrypto";

create table if not exists "subscriber" (
  "id" uuid primary key default gen_random_uuid(),
  "email" text not null unique,
  "source" text not null,
  "sequence_step" integer not null default 0,
  "created_at" timestamptz not null default now()
);

create table if not exists "order" (
  "id" uuid primary key default gen_random_uuid(),
  "email" text not null,
  "brief_slug" text not null,
  "amount" integer not null,
  "currency" text not null,
  "provider" text not null,
  "provider_ref" text,
  "status" text not null default 'pending',
  "created_at" timestamptz not null default now()
);

create table if not exists "commission_request" (
  "id" uuid primary key default gen_random_uuid(),
  "project" text not null,
  "deadline" text not null,
  "budget" text not null,
  "question" text not null,
  "email" text,
  "created_at" timestamptz not null default now()
);
