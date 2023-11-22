import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
function generateDbURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Por favor coloque o DATABASE_URL no .env");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const dbURL = generateDbURL(schema);

    process.env.DATABASE_URL = dbURL;

    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
        await prisma.$disconnect;
      },
    };
  },
};
