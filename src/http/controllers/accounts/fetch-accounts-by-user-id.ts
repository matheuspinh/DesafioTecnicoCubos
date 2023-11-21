import { Request, Response } from "express";
import { MakeFetchAccountsByUserIdService } from "@/services/factories/make-fetch-accounts-by-user-id-service";
import { formatAccountNumber } from "@/utils/format-account-number";

export async function fetchAccountsByUserId(req: Request, res: Response) {
  const userId = req.userId!;

  const { itemsPerPage, currentPage } = req.query;

  const page = Number(currentPage);
  const perPage = Number(itemsPerPage);

  const fetchAccountsByUserIdService = MakeFetchAccountsByUserIdService();

  try {
    const { accounts, totalAccounts } =
      await fetchAccountsByUserIdService.execute({
        userId,
        page,
        perPage,
      });

    const transformedAccounts = accounts.map(
      ({ balance, userId, ...accountItem }) => ({
        ...accountItem,
        account: formatAccountNumber(accountItem.account),
      })
    );

    const responseData = {
      accounts: transformedAccounts,
      pagination: {
        totalCount: totalAccounts,
        itemsPerPage: perPage,
        currentPage: page,
        pageCount: Math.ceil(totalAccounts / perPage),
      },
    };

    return res.status(200).send(responseData);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
