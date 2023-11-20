import { Account, Prisma } from "@prisma/client";

export interface AccountsRepository {
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>;
  findByAccount(account: string): Promise<Account | null>;
}
