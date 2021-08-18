CREATE DATABASE calculator;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "date_created" timestamp
);

CREATE TABLE "projects" (
  "id" serial PRIMARY KEY,
  "name" varchar,
  "owner_user_id" int,
  "date_created" timestamp
);

CREATE TABLE "walls" (
  "id" serial PRIMARY KEY,
  "project_id" int,
  "date_created" timestamp,
  "wall_length" int
);

CREATE TABLE "studs" (
  "id" serial PRIMARY KEY,
  "wall_id" int,
  "date_created" timestamp,
  "stud_num" int
);

ALTER TABLE "projects" ADD FOREIGN KEY ("owner_user_id") REFERENCES "users" ("id");

ALTER TABLE "walls" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "studs" ADD FOREIGN KEY ("wall_id") REFERENCES "walls" ("id");*/

