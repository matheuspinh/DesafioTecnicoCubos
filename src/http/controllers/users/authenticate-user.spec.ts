import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import http from "http";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

let server: http.Server;

describe("POST /login", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to authenticate a user", async () => {
    await createAndAuthenticateUser(app);

    const { body, statusCode } = await request(server).post("/login").send({
      document: "12345678910",
      password: "12345678",
    });

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("token");
  });
});
