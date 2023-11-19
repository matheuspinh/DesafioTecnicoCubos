import { FastifyInstance } from "fastify";
import { registerUser } from "./register-user";
import { authenticateUser } from "./authenticate-user";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/people", registerUser);
  app.post("/login", authenticateUser);
}
