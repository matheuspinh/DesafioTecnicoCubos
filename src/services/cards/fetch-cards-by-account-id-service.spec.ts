import { CardsRepository } from "@/repositories/cards-repository";
import { FetchCardsByAccountIdService } from "./fetch-cards-by-account-id-service";
import { beforeEach, describe, expect, it } from "vitest";
import { FakeCardsRepository } from "@/repositories/fakes/fake-cards-repository";

let cardsRepository: CardsRepository;
let sut: FetchCardsByAccountIdService;

describe("fetch cards by account id service", () => {
  beforeEach(async () => {
    cardsRepository = new FakeCardsRepository();
    sut = new FetchCardsByAccountIdService(cardsRepository);

    await cardsRepository.create({
      accountId: "account-id",
      type: "physical",
      cvv: "123",
      number: "1234567891234567",
      userId: "user-id",
    });
    await cardsRepository.create({
      accountId: "account-id",
      type: "virtual",
      cvv: "123",
      number: "1234567891234569",
      userId: "user-id",
    });
    await cardsRepository.create({
      accountId: "account-id",
      type: "virtual",
      cvv: "123",
      number: "1234567891234568",
      userId: "user-id",
    });
  });

  it("should be able to fetch two cards", async () => {
    const { cards } = await sut.execute({
      accountId: "account-id",
      page: 1,
      perPage: 2,
    });

    expect(cards).toHaveLength(2);
  });

  it("should return the total of cards", async () => {
    const { totalCards } = await sut.execute({
      accountId: "account-id",
      page: 1,
      perPage: 2,
    });

    expect(totalCards).toEqual(3);
  });

  it("should return an empty array if page has no cards", async () => {
    const { cards } = await sut.execute({
      accountId: "account-id",
      page: 3,
      perPage: 2,
    });

    expect(cards).toHaveLength(0);
  });

  it("should return an empty array if no cards are found", async () => {
    const { cards } = await sut.execute({
      accountId: "fake-account",
      page: 1,
      perPage: 2,
    });

    expect(cards).toHaveLength(0);
  });

  it("should return a page with a single card", async () => {
    const { cards } = await sut.execute({
      accountId: "account-id",
      page: 2,
      perPage: 2,
    });

    expect(cards).toHaveLength(1);
  });
});
