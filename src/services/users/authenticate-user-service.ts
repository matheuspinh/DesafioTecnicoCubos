import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUserServiceRequest {
  document: string;
  password: string;
}

export class AuthenticateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: AuthenticateUserServiceRequest) {
    const user = await this.usersRepository.findByDocument(data.document);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await compare(data.password, user.passwordHash);

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
