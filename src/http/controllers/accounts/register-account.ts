import { AccountAlreadyRegisteredError } from "@/services/errors/account-already-registered-error";
import { MakeRegisterAccountService } from "@/services/factories/make-register-account-service";
import { formatAccountNumber } from "@/utils/format-account-number";
import { Request, Response } from "express";

export async function registerAccount(req: Request, res: Response) {
  const { branch, account } = req.body;
  const userId = req.userId!;

  try {
    const registerAccountService = MakeRegisterAccountService();
    const newAccount = await registerAccountService.execute({
      branch,
      account,
      userId,
    });

    const responseData = {
      id: newAccount.id,
      branch: newAccount.branch,
      account: formatAccountNumber(newAccount.account),
      createdAt: newAccount.createdAt,
      updatedAt: newAccount.updatedAt,
    };

    return res.status(201).send(responseData);
  } catch (error) {
    if (error instanceof AccountAlreadyRegisteredError) {
      return res.status(409).send({ message: error.message });
    }
    throw error;
  }
}
