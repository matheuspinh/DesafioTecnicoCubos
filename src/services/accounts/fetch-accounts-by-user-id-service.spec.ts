import { AccountsRepository } from "@/repositories/accounts-repository";
import { FetchAccountsByUserIdService } from "./fetch-accounts-by-user-id-service";
import { beforeEach, describe, expect, it } from "vitest";
import { FakeAccountsRepository } from "@/repositories/fakes/fake-accounts-respository";

let accountsRepository: AccountsRepository;
let sut: FetchAccountsByUserIdService;

describe("fetch certificates by user id service", () => {
  beforeEach(async () => {
    accountsRepository = new FakeAccountsRepository();
    sut = new FetchAccountsByUserIdService(accountsRepository);

    await accountsRepository.create({
      branch: "001",
      account: "0000001",
      userId: "user-id",
    });

    await accountsRepository.create({
      branch: "001",
      account: "0000002",
      userId: "user-id",
    });

    await accountsRepository.create({
      branch: "001",
      account: "0000003",
      userId: "user-id",
    });
  });

  it("should be able to fetch two accounts", async () => {
    const { accounts } = await sut.execute({
      userId: "user-id",
      page: 1,
      perPage: 2,
    });

    expect(accounts).toHaveLength(2);
  });

  it("should return the total of accounts", async () => {
    const { totalAccounts } = await sut.execute({
      userId: "user-id",
      page: 1,
      perPage: 2,
    });

    expect(totalAccounts).toEqual(3);
  });

  it("should return an empty array if page has no account", async () => {
    const { accounts } = await sut.execute({
      userId: "user-id",
      page: 3,
      perPage: 2,
    });

    expect(accounts).toHaveLength(0);
  });

  it("should return an empty array if no accounts are found", async () => {
    const { accounts } = await sut.execute({
      userId: "fake-user",
      page: 1,
      perPage: 2,
    });

    expect(accounts).toHaveLength(0);
  });

  it("should return a page with a single account", async () => {
    const { accounts } = await sut.execute({
      userId: "user-id",
      page: 2,
      perPage: 2,
    });

    expect(accounts).toHaveLength(1);
  });
});
