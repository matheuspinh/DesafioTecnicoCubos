import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { MakeAuthenticateUserService } from "@/services/factories/make-authenticate-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateUserBodySchema = z.object({
    document: z.string({ required_error: "Document is required" }),
    password: z.string({ required_error: "Password is required" }),
  });

  const { document, password } = authenticateUserBodySchema.parse(request.body);

  const formattedDocument = document.replace(/\D/g, "");

  const authenticateUserService = MakeAuthenticateUserService();

  try {
    const { user } = await authenticateUserService.execute({
      document: formattedDocument,
      password,
    });

    const token = await reply.jwtSign({ id: user.id });

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}
