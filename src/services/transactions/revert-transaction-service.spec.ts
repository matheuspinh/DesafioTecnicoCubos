import { FakeTransactionsRepository } from "@/repositories/fakes/fake-transactions-repository";
import { RevertTransactionService } from "./revert-transaction-service";
import { FakeAccountsRepository } from "@/repositories/fakes/fake-accounts-respository";
import { beforeEach, describe, expect, it } from "vitest";
import { AccountsRepository } from "@/repositories/accounts-repository";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { InsufficientFundsError } from "../errors/insuficient-funds-error";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";
import { TransactionNotFound } from "../errors/transaction-not-found";

let accountsRepository: AccountsRepository;
let transactionsRepository: TransactionsRepository;
let sut: RevertTransactionService;

describe("revert transaction service", () => {
  beforeEach(async () => {
    accountsRepository = new FakeAccountsRepository();
    transactionsRepository = new FakeTransactionsRepository();
    sut = new RevertTransactionService(
      transactionsRepository,
      accountsRepository
    );
  });

  it("should be able to revert a debit transaction", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 40000,
    });

    const fakeTransaction = await transactionsRepository.create({
      accountId: fakeAccount.id,
      type: "debit",
      description: "fake description",
      value: -1000,
    });

    const revertedTransaction = await sut.execute({
      transactionId: fakeTransaction.id,
      accountId: fakeAccount.id,
      description: "new fake description",
    });

    expect(revertedTransaction).toHaveProperty("id");
    expect(revertedTransaction.value).toEqual(1000);
    expect(fakeAccount.balance).toEqual(41000);
    expect(revertedTransaction.type).toEqual("credit");
  });

  it("should be able to revert a credit transaction", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 40000,
    });

    const fakeTransaction = await transactionsRepository.create({
      accountId: fakeAccount.id,
      type: "credit",
      description: "fake description",
      value: 1000,
    });

    const revertedTransaction = await sut.execute({
      transactionId: fakeTransaction.id,
      accountId: fakeAccount.id,
      description: "new fake description",
    });

    expect(revertedTransaction).toHaveProperty("id");
    expect(revertedTransaction.value).toEqual(-1000);
    expect(fakeAccount.balance).toEqual(39000);
    expect(revertedTransaction.type).toEqual("debit");
  });

  it("should not be able to revert a credit transaction if not enough funds", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 900,
    });

    const fakeTransaction = await transactionsRepository.create({
      accountId: fakeAccount.id,
      type: "credit",
      description: "fake description",
      value: 1000,
    });

    await expect(() =>
      sut.execute({
        transactionId: fakeTransaction.id,
        accountId: fakeAccount.id,
        description: "new fake description",
      })
    ).rejects.toBeInstanceOf(InsufficientFundsError);
  });

  it("should not be able to revert a transaction if account is not found", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 900,
    });

    const fakeTransaction = await transactionsRepository.create({
      accountId: "invalid id",
      type: "credit",
      description: "fake description",
      value: 1000,
    });

    await expect(() =>
      sut.execute({
        transactionId: fakeTransaction.id,
        accountId: "invalid id",
        description: "new fake description",
      })
    ).rejects.toBeInstanceOf(CouldNotFoundAccountError);
  });

  it("should not be able to revert a transaction if no transaction is found", async () => {
    const fakeAccount = await accountsRepository.create({
      branch: "0001",
      account: "0000001",
      userId: "fake user id",
      balance: 900,
    });

    const fakeTransaction = await transactionsRepository.create({
      accountId: fakeAccount.id,
      type: "credit",
      description: "fake description",
      value: 1000,
    });

    await expect(() =>
      sut.execute({
        transactionId: "invalid id",
        accountId: fakeAccount.id,
        description: "new fake description",
      })
    ).rejects.toBeInstanceOf(TransactionNotFound);
  });
});
