import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { MakeAuthenticateUserService } from "@/services/factories/make-authenticate-user-service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function authenticateUser(request: Request, res: Response) {
  console.log(request.body);
  try {
    const { document, password } = request.body;

    const formattedDocument = document.replace(/\D/g, "");

    const authenticateUserService = MakeAuthenticateUserService();

    const { user } = await authenticateUserService.execute({
      document: formattedDocument,
      password,
    });

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return res.status(200).send({ token: `Bearer ${token}` });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: error.message });
    }

    throw error;
  }
}
