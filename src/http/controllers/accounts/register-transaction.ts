import { CouldNotFoundAccountError } from "@/services/errors/could-not-find-account-error";
import { InsufficientFundsError } from "@/services/errors/insuficient-funds-error";
import { MakeRegisterTransactionService } from "@/services/factories/make-register-transaction-service";
import { transformToCents } from "@/utils/transform-to-cents";
import { Request, Response } from "express";

export async function registerTransaction(req: Request, res: Response) {
  const accountId = req.params.accountId;
  const { description, value } = req.body;

  const formattedValue = transformToCents(value);

  const registerTransactionService = MakeRegisterTransactionService();

  try {
    const { transaction } = await registerTransactionService.execute({
      accountId,
      description,
      value: formattedValue,
    });
    const responseData = {
      id: transaction.id,
      description: transaction.description,
      value,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };

    return res.status(201).send(responseData);
  } catch (error) {
    if (error instanceof CouldNotFoundAccountError) {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof InsufficientFundsError) {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
