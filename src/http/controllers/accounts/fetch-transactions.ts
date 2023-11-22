import { MakeFetchTransactionsService } from "@/services/factories/make-fetch-transactions-service";
import { Request, Response } from "express";

export async function fetchFilteredTransactions(req: Request, res: Response) {
  const accountId = req.params.accountId;
  const { itemsPerPage, currentPage, search, type } = req.query;

  const page = Number(currentPage);
  const perPage = Number(itemsPerPage);

  const fetchFilteredTransactionsService = MakeFetchTransactionsService();

  try {
    const { transactions, totalTransactions } =
      await fetchFilteredTransactionsService.execute({
        accountId,
        page,
        perPage,
        description: search as string | undefined,
        type: type as "debit" | "credit" | undefined,
      });

    const transformedTransactions = transactions.map(
      ({ type, accountId, ...transaction }) => ({
        ...transaction,
        value: transaction.value / 100,
      })
    );

    const responseData = {
      transactions: transformedTransactions,
      pagination: {
        totalCount: totalTransactions,
        itemsPerPage: perPage,
        currentPage: page,
        pageCount: Math.ceil(totalTransactions / perPage),
      },
    };

    return res.status(200).send(responseData);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
