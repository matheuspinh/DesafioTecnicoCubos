import { app } from "@/app";
import http from "http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

let server: http.Server;

describe("POST /people", () => {
  beforeAll(async () => {
    server = http.createServer(app);
    server.listen(4444);
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to register a new user", async () => {
    const { body, statusCode } = await request(server).post("/people").send({
      name: "Fake User",
      document: "12345678910",
      password: "12345678",
    });

    expect(statusCode).toBe(201);
    expect(body).toHaveProperty("id");
  });
});
