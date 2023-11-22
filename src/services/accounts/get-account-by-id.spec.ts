import { AccountsRepository } from "@/repositories/accounts-repository";
import { GetAccountById } from "./get-account-by-id";
import { beforeEach, describe, expect, it } from "vitest";
import { FakeAccountsRepository } from "@/repositories/fakes/fake-accounts-respository";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";

let sut: GetAccountById;
let accountsRepository: AccountsRepository;

describe("get account by id service", () => {
  beforeEach(async () => {
    accountsRepository = new FakeAccountsRepository();
    sut = new GetAccountById(accountsRepository);
  });

  it("should be able to get account by id", async () => {
    const account = await accountsRepository.create({
      branch: "001",
      account: "0000001",
      userId: "user-id",
      balance: 100,
    });

    const accountById = await sut.execute(account.id);

    expect(accountById).toEqual(account);
  });

  it("should not be able to get account with invalid id", async () => {
    await accountsRepository.create({
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
