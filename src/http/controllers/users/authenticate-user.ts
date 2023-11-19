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

  try {
    const authenticateUserService = MakeAuthenticateUserService();
    const { user } = await authenticateUserService.execute({
      document,
      password,
    });

    const token = reply.jwtSign({ id: user.id });

    return reply.status(200).send({ token: `Bearer ${token}` });
  } catch (error) {
    return;
  }
}
