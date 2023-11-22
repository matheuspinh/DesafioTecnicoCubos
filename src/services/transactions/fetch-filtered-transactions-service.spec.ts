import { FetchFilteredTransactionsService } from "./fetch-filtered-transactions-service";
import { beforeEach, describe, expect, it } from "vitest";
import { FakeTransactionsRepository } from "@/repositories/fakes/fake-transactions-repository";

let transactionsRepository: FakeTransactionsRepository;
let sut: FetchFilteredTransactionsService;

describe("fetch filtered transactions service", () => {
  beforeEach(async () => {
    transactionsRepository = new FakeTransactionsRepository();
    sut = new FetchFilteredTransactionsService(transactionsRepository);

    await transactionsRepository.create({
      accountId: "0000001",
      value: 1000,
      description: "any_description",
      type: "credit",
    });
    await transactionsRepository.create({
      accountId: "0000001",
      value: 1000,
      description: "specific_description",
      type: "credit",
    });
    await transactionsRepository.create({
      accountId: "0000001",
      value: -1000,
      description: "debt_description",
      type: "debit",
    });
    await transactionsRepository.create({
      accountId: "0000002",
      value: 1000,
      description: "different_account_description",
      type: "credit",
    });
  });

  it("should be able to fetch transactions by passing only the account id", async () => {
    const { transactions, totalTransactions } = await sut.execute({
      accountId: "0000001",
      page: 1,
      perPage: 10,
    });

    expect(totalTransactions).toEqual(3);
    expect(transactions).toHaveLength(3);
  });

  it("should be able to fetch transactions by passing the account id and a description", async () => {
    const { transactions, totalTransactions } = await sut.execute({
      accountId: "0000001",
      page: 1,
      perPage: 10,
      description: "specific",
    });

    expect(totalTransactions).toEqual(1);
    expect(transactions).toHaveLength(1);
    expect(transactions[0].description).toEqual("specific_description");
  });
  it("should be able to fetch transactions by passing the account id and a type", async () => {
    const { transactions, totalTransactions } = await sut.execute({
      accountId: "0000001",
      page: 1,
      perPage: 10,
      type: "credit",
    });

    expect(totalTransactions).toEqual(2);
    expect(transactions).toHaveLength(2);
    expect(transactions[0].type).toEqual("credit");
    expect(transactions[1].type).toEqual("credit");
  });
  it("should not be able to fetch transactions by passing the account id and a invalid description", async () => {
    const { transactions, totalTransactions } = await sut.execute({
      accountId: "0000001",
      page: 1,
      perPage: 10,
      description: "not a valid description",
    });

    expect(totalTransactions).toEqual(0);
    expect(transactions).toHaveLength(0);
  });
});
