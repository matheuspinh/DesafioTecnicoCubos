import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { Express } from "express";
import request from "supertest";

export async function createAndAuthenticateUser(app: Express) {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      document: "12345678910",
      passwordHash: await hash("12345678", 6),
    },
  });

  const authResponse = await request(app).post("/login").send({
    document: user.document,
    password: "12345678",
  });

  const token = authResponse.body.token;

  return {
    token,
    user,
  };
}
