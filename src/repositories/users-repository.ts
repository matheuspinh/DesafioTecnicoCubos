import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByDocument(document: string): Promise<User | null>;
}
