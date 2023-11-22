import { describe, beforeAll, afterAll, it, expect } from "vitest";
import http from "http";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

let server: http.Server;

describe("POST /accounts", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to register a new account", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const { body, statusCode } = await request(server)
      .post("/accounts")
      .set("Authorization", token)
      .send({
        branch: "001",
        account: "0000001",
      });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty("id");
  });
});
