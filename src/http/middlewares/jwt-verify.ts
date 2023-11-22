import { env } from "@/env";
import { CouldNotFoundAccountError } from "@/services/errors/could-not-find-account-error";
import { MakeGetAccountByIdService } from "@/services/factories/make-get-account-by-id-service";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token was not provided" });
  }

  const token = authorization.replace("Bearer", "").trim();

  if (!token) {
    return res.status(401).json({ message: "Token was not provided" });
  }

  try {
    const { id } = jwt.verify(token, env.JWT_SECRET) as { id: string };
    req.userId = id;

    const { accountId } = req.params;

    if (accountId) {
      const getAccountByIdService = MakeGetAccountByIdService();
      const account = await getAccountByIdService.execute(accountId);

      if (account.userId !== id) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    next();
  } catch (error) {
    if (error instanceof CouldNotFoundAccountError) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
}
