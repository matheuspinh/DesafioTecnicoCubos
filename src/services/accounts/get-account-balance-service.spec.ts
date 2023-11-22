import { AccountsRepository } from "@/repositories/accounts-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetAccountBalanceService } from "./get-account-balance-service";
import { FakeAccountsRepository } from "@/repositories/fakes/fake-accounts-respository";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";

let sut: GetAccountBalanceService;
let accountsRepository: AccountsRepository;

describe("get account balance service", () => {
  beforeEach(async () => {
    accountsRepository = new FakeAccountsRepository();
    sut = new GetAccountBalanceService(accountsRepository);
  });

  it("should be able to get account balance", async () => {
    const account = await accountsRepository.create({
      branch: "001",
      account: "0000001",
      userId: "user-id",
      balance: 100,
    });

    const balance = await sut.execute(account.id);

    expect(balance).toEqual(100);
  });

  it("should not be able to get account balance", async () => {
    const account = await accountsRepository.create({
      branch: "001",
      account: "0000001",
      userId: "user-id",
      balance: 100,
    });

    await expect(() =>
      sut.execute("invalid-account-id")
    ).rejects.toBeInstanceOf(CouldNotFoundAccountError);
  });
});
