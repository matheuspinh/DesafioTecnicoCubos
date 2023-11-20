import { AccountAlreadyRegisteredError } from "@/services/errors/account-already-registered-error";
import { makeRegisterAccountService } from "@/services/factories/make-register-account-service";
import { formatAccountNumber } from "@/utils/format-account-number";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerAccount(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerAccountBodySchema = z.object({
    branch: z
      .string({ required_error: "Branch is required" })
      .length(3, { message: "Branch must have 3 characters" }),
    account: z.string({ required_error: "Account is required" }),
  });

  const { branch, account } = registerAccountBodySchema.parse(request.body);
  const userId = request.user.id;

  try {
    const registerAccountService = makeRegisterAccountService();
    const newAccount = await registerAccountService.execute({
      branch,
      account,
      userId,
    });

    const replyData = {
      id: newAccount.id,
      branch: newAccount.branch,
      account: formatAccountNumber(newAccount.account),
      createdAt: newAccount.createdAt,
      updatedAt: newAccount.updatedAt,
    };

    return reply.status(201).send(replyData);
  } catch (error) {
    if (error instanceof AccountAlreadyRegisteredError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
