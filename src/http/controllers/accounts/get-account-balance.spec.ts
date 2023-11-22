import { afterAll, beforeAll, describe, expect, it } from "vitest";
import http from "http";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { createAccount } from "@/utils/tests/create-account";

let server: http.Server;

describe("GET /accounts/:accountsId/balance", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to fetch balance by account id", async () => {
    const { token, user } = await createAndAuthenticateUser(app);
    const account = await createAccount({
      userId: user.id,
      branch: "0001",
      account: "0000001",
    });

    const { body, statusCode } = await request(server)
      .get(`/accounts/${account.id}/balance`)
      .set("Authorization", token)
      .send();

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("balance");
  });
});
