import { UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateUserService } from "./authenticate-user-service";
import { RegisterNewUserService } from "./register-new-user-service";
import { FakeUsersRepository } from "@/repositories/fakes/fake-users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let usersRepository: UsersRepository;
let registerNewUserService: RegisterNewUserService;
let sut: AuthenticateUserService;

describe("Authentication Service", () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    sut = new AuthenticateUserService(usersRepository);
    registerNewUserService = new RegisterNewUserService(usersRepository);

    await registerNewUserService.execute({
      name: "fake name",
      document: "12345678900",
      password: "12345678",
    });
  });

  it("should be able to authenticate a user", async () => {
    const { user } = await sut.execute({
      document: "12345678900",
      password: "12345678",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate a user with invalid document", async () => {
    await expect(() =>
      sut.execute({
        document: "123456789001",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate a user with an invalid password", async () => {
    await expect(() =>
      sut.execute({
        document: "12345678900",
        password: "123456789",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
