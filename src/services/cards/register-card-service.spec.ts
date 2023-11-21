import { FakeCardsRepository } from "@/repositories/fakes/fake-cards-repository";
import { RegisterCardService } from "./register-card-service";
import { beforeEach, describe, expect, it } from "vitest";
import { AccountAlreadyHasPhysicalCardError } from "../errors/account-already-has-physical-card-error";
import { CardAlreadyExistsError } from "../errors/card-already-exists-error";

let cardsRepository: FakeCardsRepository;
let sut: RegisterCardService;

describe("Register card service", () => {
  beforeEach(() => {
    cardsRepository = new FakeCardsRepository();
    sut = new RegisterCardService(cardsRepository);
  });

  it("should be able to register a new card", async () => {
    const card = await sut.execute({
      accountId: "account-id",
      type: "physical",
      cvv: "123",
      number: "1234567891234567",
      userId: "user-id",
    });
    expect(card).toHaveProperty("id");
  });

  it("should not be able to register a physical card if the account already has one", async () => {
    await sut.execute({
      accountId: "account-id",
      type: "physical",
      cvv: "123",
      number: "1234567891234569",
      userId: "user-id",
    });

    await expect(() =>
      sut.execute({
        accountId: "account-id",
        type: "physical",
        cvv: "123",
        number: "1234567891234567",
        userId: "user-id",
      })
    ).rejects.toBeInstanceOf(AccountAlreadyHasPhysicalCardError);
  });

  it("should be able to register a virtual card if the account already has a physical one", async () => {
    await sut.execute({
      accountId: "account-id",
      type: "physical",
      cvv: "123",
      number: "1234567891234567",
      userId: "user-id",
    });

    const card = await sut.execute({
      accountId: "account-id",
      type: "virtual",
      cvv: "123",
      number: "1234567891234563",
      userId: "user-id",
    });

    expect(card.type).toEqual("virtual");
  });

  it("should be able to register more than one virtual card", async () => {
    await sut.execute({
      accountId: "account-id",
      type: "virtual",
      cvv: "123",
      number: "1234567891234562",
      userId: "user-id",
    });

    const card = await sut.execute({
      accountId: "account-id",
      type: "virtual",
      cvv: "123",
      number: "1234567891234567",
      userId: "user-id",
    });

    expect(card.type).toEqual("virtual");
  });

  it("should not be able to register a card with the same number", async () => {
    await sut.execute({
      accountId: "account-id",
      type: "virtual",
      cvv: "123",
      number: "1234567891234562",
      userId: "user-id",
    });

    await expect(() =>
      sut.execute({
        accountId: "account-id",
        type: "virtual",
        cvv: "123",
        number: "1234567891234562",
        userId: "user-id",
      })
    ).rejects.toBeInstanceOf(CardAlreadyExistsError);
  });
});
