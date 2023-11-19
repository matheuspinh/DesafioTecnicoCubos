import { DocumentAlreadyRegisteredError } from "@/services/errors/document-already-registered-error";
import { InvalidDocumentError } from "@/services/errors/invalid-document-error";
import { makeRegisterNewUserService } from "@/services/factories/make-register-new-user-service";
import { formatDocument } from "@/utils/format-document";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerUserBodySchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    document: z.string({ required_error: "Document is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must have at least 6 characters" }),
  });

  const { name, document, password } = registerUserBodySchema.parse(
    request.body
  );

  const formattedDocument = formatDocument(document);

  try {
    const registerNewUserService = makeRegisterNewUserService();
    const user = await registerNewUserService.execute({
      name,
      document: formattedDocument,
      password,
    });

    const replyData = {
      id: user.id,
      name: user.name,
      document: user.document,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return reply.status(201).send(replyData);
  } catch (error) {
    if (error instanceof DocumentAlreadyRegisteredError) {
      return reply.status(409).send({ message: error.message });
    }
    if (error instanceof InvalidDocumentError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}
