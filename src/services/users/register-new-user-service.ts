import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { DocumentAlreadyRegisteredError } from "../errors/document-already-registered-error";
import { validateDocument } from "@/utils/validate-document";
import { InvalidDocumentError } from "../errors/invalid-document-error";

interface RegisterNewUserServiceRequest {
  name: string;
  document: string;
  password: string;
}

export class RegisterNewUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterNewUserServiceRequest) {
    const passwordHash = await hash(data.password, 6);

    const documentAlreadyRegistered = await this.usersRepository.findByDocument(
      data.document
    );

    if (documentAlreadyRegistered) {
      throw new DocumentAlreadyRegisteredError();
    }

    const isValidDocument = validateDocument(data.document);

    if (!isValidDocument) {
      throw new InvalidDocumentError();
    }

    const user = await this.usersRepository.create({
      name: data.name,
      document: data.document,
      passwordHash,
    });

    return user;
  }
}
