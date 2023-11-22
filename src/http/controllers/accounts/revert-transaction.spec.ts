import http from "http";
import { app } from "@/app";
import request from "supertest";
import { describe, beforeAll, afterAll, it, expect } from "vitest";
import { createAccount } from "@/utils/tests/create-account";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { createTransaction } from "@/utils/tests/create-transaction";

let server: http.Server;

describe("POST /accounts/:accountId/transactions/:transactionId/revert", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to revert a transaction", async () => {
    const { token, user } = await createAndAuthenticateUser(app);
    const account = await createAccount({
      userId: user.id,
      branch: "001",
      account: "0000001",
    });
    const transaction = await createTransaction({
      accountId: account.id,
      value: -100,
      description: "test",
    });

    const { body, statusCode } = await request(server)
      .post(`/accounts/${account.id}/transactions/${transaction.id}/revert`)
      .set("Authorization", token)
      .send({ description: "test" });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty("id");
  });
});
