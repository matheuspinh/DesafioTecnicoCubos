import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";
import { RegisterAccountService } from "../accounts/register-account-service";

export function MakeRegisterAccountService() {
  const accountsRepository = new PrismaAccountsRepository();
  const registerAccountService = new RegisterAccountService(accountsRepository);

  return registerAccountService;
}
