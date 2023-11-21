import { Account, Prisma } from "@prisma/client";

export interface FetchByUserIdData {
  userId: string;
  page: number;
  perPage: number;
}
export interface AccountsRepository {
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>;
  findByAccount(account: string): Promise<Account | null>;
  fetchByUserId(
    data: FetchByUserIdData
  ): Promise<{ accounts: Account[]; totalAccounts: number }>;
}
