import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterNewUserService } from "../users/register-new-user-service";

export function makeRegisterNewUserService() {
  const usersRepository = new PrismaUsersRepository();
  const registerNewUserService = new RegisterNewUserService(usersRepository);

  return registerNewUserService;
}
