import { afterAll, beforeAll, describe, expect, it } from "vitest";
import http from "http";
import { app } from "@/app";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

let server: http.Server;

describe("GET /accounts/cards", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to fetch cards by user id", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { body, statusCode } = await request(server)
      .get("/accounts/cards?itemsPerPage=10&currentPage=1")
      .set("Authorization", token)
      .send();

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("cards");
    expect(body).toHaveProperty("pagination");
  });
});
