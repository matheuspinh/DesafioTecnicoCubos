import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { MakeAuthenticateUserService } from "@/services/factories/make-authenticate-user-service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function authenticateUser(request: Request, res: Response) {
  const { document, password } = request.body;

  const formattedDocument = document.replace(/\D/g, "");

  const authenticateUserService = MakeAuthenticateUserService();

  try {
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

    return res.status(500).send({ message: "Internal server error" });
  }
}
