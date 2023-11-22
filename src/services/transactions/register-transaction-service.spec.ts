import { TransactionsRepository } from "@/repositories/transactions-repository";
import { RegisterTransactionService } from "./register-transaction-service";
import { AccountsRepository } from "@/repositories/accounts-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FakeAccountsRepository } from "@/repositories/fakes/fake-accounts-respository";
import { FakeTransactionsRepository } from "@/repositories/fakes/fake-transactions-repository";
import { InsufficientFundsError } from "../errors/insuficient-funds-error";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";

let accountsRepository: AccountsRepository;
let transactionsRepository: TransactionsRepository;
let sut: RegisterTransactionService;

describe("register transaction service", () => {
  beforeEach(async () => {
    accountsRepository = new FakeAccountsRepository();
    transactionsRepository = new FakeTransactionsRepository();
    sut = new RegisterTransactionService(
      transactionsRepository,
      accountsRepository
    );
  });

  it("should be able to register a new credit transaction", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 40000,
    });

    const { transaction, balance } = await sut.execute({
      accountId: fakeAccount.id,
      description: "fake description",
      value: 1000,
    });

    expect(transaction).toHaveProperty("id");
    expect(transaction.type).toEqual("credit");
    expect(balance).toEqual(41000);
  });

  it("should be able to register a debit transaction", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 40000,
    });

    const { transaction, balance } = await sut.execute({
      accountId: fakeAccount.id,
      description: "fake description",
      value: -1000,
    });

    expect(transaction).toHaveProperty("id");
    expect(transaction.type).toEqual("debit");
    expect(balance).toEqual(39000);
  });

  it("should not be able to register a debit transaction over the balance", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 40000,
    });

    await expect(() =>
      sut.execute({
        accountId: fakeAccount.id,
        description: "fake description",
        value: -100000,
      })
    ).rejects.toBeInstanceOf(InsufficientFundsError);
  });

  it("should not be able to register a transaction with an invalid account", async () => {
    await expect(() =>
      sut.execute({
        accountId: "invalid account id",
        description: "fake description",
        value: 1000,
      })
    ).rejects.toBeInstanceOf(CouldNotFoundAccountError);
  });
});
