import { CouldNotFoundAccountError } from "@/services/errors/could-not-find-account-error";
import { MakeGetAccountBalanceService } from "@/services/factories/make-get-account-balance-service";
import { Request, Response } from "express";

export async function getAccountBalance(req: Request, res: Response) {
  const accountId = req.params.accountId;

  const getAccountBalanceService = MakeGetAccountBalanceService();

  try {
    const balance = await getAccountBalanceService.execute(accountId);
    const transformedBalance = balance / 100;

    return res.status(200).send({ balance: transformedBalance });
  } catch (error) {
    if (error instanceof CouldNotFoundAccountError) {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
