import { FastifyInstance } from "fastify";
import { usersRoutes } from "./controllers/users/router";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
}
