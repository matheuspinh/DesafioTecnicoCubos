import { MakeFetchCardsByAccountIdService } from "@/services/factories/make-fetch-cards-by-account-id-service";
import { formatCardNumber } from "@/utils/format-card-number";
import { Request, Response } from "express";

export async function fetchCardsByAccountId(req: Request, res: Response) {
  const accountId = req.params.accountId;

  const { itemsPerPage, currentPage } = req.query;

  const page = Number(currentPage);
  const perPage = Number(itemsPerPage);

  const fetchCardsByAccountIdService = MakeFetchCardsByAccountIdService();

  try {
    const { cards, totalCards } = await fetchCardsByAccountIdService.execute({
      accountId,
      page,
      perPage,
    });

    const transformedCards = cards.map(({ accountId, userId, ...card }) => ({
      ...card,
      number: formatCardNumber(card.number),
    }));

    const responseData = {
      cards: transformedCards,
      pagination: {
        totalCount: totalCards,
        itemsPerPage: perPage,
        currentPage: page,
        pageCount: Math.ceil(totalCards / perPage),
      },
    };

    return res.status(200).send(responseData);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
