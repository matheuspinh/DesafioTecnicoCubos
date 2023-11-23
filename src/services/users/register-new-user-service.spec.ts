import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterNewUserService } from "./register-new-user-service";
import { compare } from "bcryptjs";
import { DocumentAlreadyRegisteredError } from "../errors/document-already-registered-error";
import { InvalidDocumentError } from "../errors/invalid-document-error";

let usersRepository: FakeUsersRepository;
let sut: RegisterNewUserService;

describe("Register new user service", () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    sut = new RegisterNewUserService(usersRepository);
  });
  it("should be able to register a new user", async () => {
    const user = await sut.execute({
      name: "User Name",
      document: "94675485006",
      password: "123456",
    });
    expect(user).toHaveProperty("id");
    expect(user.name).toEqual("User Name");
  });

  it("should save the hashed password", async () => {
    const user = await sut.execute({
      name: "User Name",
      document: "94675485006",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.passwordHash);

    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to register with the same document twice", async () => {
    await sut.execute({
      name: "User Name",
      document: "94675485006",
      password: "123456",
    });
    await expect(() =>
      sut.execute({
        name: "User Name",
        document: "94675485006",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(DocumentAlreadyRegisteredError);
  });

  it("should not be able to register with invalid document", async () => {
    await expect(() =>
      sut.execute({
        name: "User Name",
        document: "123456789001",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidDocumentError);
  });
});
