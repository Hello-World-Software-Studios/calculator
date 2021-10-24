CREATE DATABASE calculator;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "date_created" timestamp DEFAULT now()
);

CREATE TABLE "projects" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "owner_user_id" int,
  "date_created" timestamp DEFAULT now()
);

CREATE TABLE "walls" (
  "id" serial PRIMARY KEY,
  "project_id" int,
  "wall_length" int,
  "date_created" timestamp DEFAULT now()
);

ALTER TABLE "projects" ADD FOREIGN KEY ("owner_user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "walls" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE CASCADE;
