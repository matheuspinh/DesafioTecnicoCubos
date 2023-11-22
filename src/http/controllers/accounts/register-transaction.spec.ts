import { describe, beforeAll, afterAll, it, expect } from "vitest";
import http from "http";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { createAccount } from "@/utils/tests/create-account";

let server: http.Server;

describe("POST /accounts/:accountId/transactions", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to register a new transaction", async () => {
    const { token, user } = await createAndAuthenticateUser(app);
    const account = await createAccount({
      userId: user.id,
      branch: "0001",
      account: "0000001",
    });

    const { body, statusCode } = await request(server)
      .post(`/accounts/${account.id}/transactions`)
      .set("Authorization", token)
      .send({
        value: 100,
        description: "test",
      });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty("id");
  });
});
