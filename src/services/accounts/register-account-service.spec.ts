import { AccountsRepository } from "@/repositories/accounts-repository";
import { RegisterAccountService } from "./register-account-service";
import { describe, beforeEach, it, expect } from "vitest";
import { FakeAccountsRepository } from "@/repositories/fakes/fake-accounts-respository";
import { AccountAlreadyRegisteredError } from "../errors/account-already-registered-error";

let accountsRepository: AccountsRepository;
let sut: RegisterAccountService;

describe("Register account service", () => {
  beforeEach(() => {
    accountsRepository = new FakeAccountsRepository();
    sut = new RegisterAccountService(accountsRepository);
  });

  it("should be able to register a new account", async () => {
    const account = await sut.execute({
      branch: "001",
      account: "123456",
      userId: "user-id",
    });
    expect(account).toHaveProperty("id");
    expect(account.branch).toEqual("001");
  });

  it("should not be able to register with the same account twice", async () => {
    await sut.execute({
      branch: "001",
      account: "123456",
      userId: "user-id",
    });

    await expect(() =>
      sut.execute({
        branch: "001",
        account: "123456",
        userId: "user-id",
      })
    ).rejects.toBeInstanceOf(AccountAlreadyRegisteredError);
  });
});
