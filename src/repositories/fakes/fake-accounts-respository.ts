import { Account, Prisma } from "@prisma/client";
import { AccountsRepository } from "../accounts-repository";
import { randomUUID } from "crypto";

export class FakeAccountsRepository implements AccountsRepository {
  public items: Account[] = [];

  async create(data: Prisma.AccountUncheckedCreateInput) {
    const account = {
      id: randomUUID(),
      branch: data.branch,
      account: data.account,
      balance: data.balance ?? 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    };

    this.items.push(account);

    return account;
  }

  async findByAccount(account: string) {
    const accountFound = this.items.find(
      (accountItem) => accountItem.account === account
    );

    return accountFound || null;
  }

  async fetchByUserId(data: { userId: string; page: number; perPage: number }) {
    let skip = (data.page - 1) * data.perPage;

    const accountsList = this.items.filter(
      (accountItem) => accountItem.userId === data.userId
    );
    const totalAccounts = accountsList.length;
    const accounts = accountsList.slice(skip, skip + data.perPage);

    return { accounts, totalAccounts };
  }

  async getAccountBalance(accountId: string) {
    const account = this.items.find(
      (accountItem) => accountItem.id === accountId
    );

    return account?.balance || null;
  }

  async updateAccountBalance(data: { accountId: string; value: number }) {
    const account = this.items.find(
      (accountItem) => accountItem.id === data.accountId
    );

    if (!account) {
      return null;
    }

    account.balance += data.value;

    return account.balance;
  }
}
