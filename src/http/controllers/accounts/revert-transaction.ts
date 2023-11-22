import { CouldNotFoundAccountError } from "@/services/errors/could-not-find-account-error";
import { InsufficientFundsError } from "@/services/errors/insuficient-funds-error";
import { TransactionNotFound } from "@/services/errors/transaction-not-found";
import { MakeRevertTransactionService } from "@/services/factories/make-revert-transaction-service";
import { Request, Response } from "express";

export async function revertTransaction(req: Request, res: Response) {
  const accountId = req.params.accountId;
  const transactionId = req.params.transactionId;
  const { description } = req.body;

  const revertTransactionService = MakeRevertTransactionService();

  try {
    const updatedTransaction = await revertTransactionService.execute({
      transactionId,
      accountId,
      description,
    });

    const responseData = {
      id: updatedTransaction.id,
      description: updatedTransaction.description,
      transaction: updatedTransaction.value,
      createdAt: updatedTransaction.createdAt,
      updatedAt: updatedTransaction.updatedAt,
    };

    return res.status(201).send(responseData);
  } catch (error) {
    if (error instanceof CouldNotFoundAccountError) {
      return res.status(404).send({ message: error.message });
    }
    if (error instanceof InsufficientFundsError) {
      return res.status(400).send({ message: error.message });
    }
    if (error instanceof TransactionNotFound) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
