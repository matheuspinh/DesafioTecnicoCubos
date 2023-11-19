import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserService } from "../users/authenticate-user-service";

export function MakeAuthenticateUserService() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  return authenticateUserService;
}
