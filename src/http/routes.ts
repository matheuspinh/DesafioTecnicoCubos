import { FastifyInstance } from "fastify";
import { usersRoutes } from "./controllers/users/router";
import { accountsRoutes } from "./controllers/accounts/router";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(accountsRoutes);
}
