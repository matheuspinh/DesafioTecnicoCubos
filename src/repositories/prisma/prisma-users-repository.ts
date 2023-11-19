import { prisma } from "@/lib/prisma";
import { UsersRepository } from "../users-repository";
import { Prisma } from "@prisma/client";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findByDocument(document: string) {
    const user = await prisma.user.findUnique({ where: { document } });

    return user || null;
  }
}
