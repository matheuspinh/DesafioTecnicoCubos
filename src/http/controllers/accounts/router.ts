import { FastifyInstance } from "fastify";
import { registerAccount } from "./register-account";
import { verifyJwt } from "@/http/middlewares/jwt-verify";

export async function accountsRoutes(app: FastifyInstance) {
  app.post("/accounts", { onRequest: [verifyJwt] }, registerAccount);
}
