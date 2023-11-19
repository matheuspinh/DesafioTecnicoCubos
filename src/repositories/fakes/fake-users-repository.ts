import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class FakeUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      document: data.document,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findByDocument(document: string) {
    const user = this.items.find((user) => user.document === document);

    return user || null;
  }
}
