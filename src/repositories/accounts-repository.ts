import { Account, Prisma } from "@prisma/client";

export interface FetchByUserIdData {
  userId: string;
  page: number;
  perPage: number;
}

export interface UpdateAccountBalanceData {
  accountId: string;
  value: number;
}
export interface AccountsRepository {
  create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>;
  findByAccount(account: string): Promise<Account | null>;
  fetchByUserId(
    data: FetchByUserIdData
  ): Promise<{ accounts: Account[]; totalAccounts: number }>;
  getAccountBalance(accountId: string): Promise<number | null>;
  updateAccountBalance(data: UpdateAccountBalanceData): Promise<number | null>;
  findById(id: string): Promise<Account | null>;
}
