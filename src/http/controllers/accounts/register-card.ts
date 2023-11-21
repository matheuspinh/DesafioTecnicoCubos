import { AccountAlreadyHasPhysicalCardError } from "@/services/errors/account-already-has-physical-card-error";
import { CardAlreadyExistsError } from "@/services/errors/card-already-exists-error";
import { makeRegisterCardService } from "@/services/factories/make-register-card-service";
import { formatCardNumber } from "@/utils/format-card-number";
import { Request, Response } from "express";

export async function registerCard(req: Request, res: Response) {
  const { type, number, cvv } = req.body;

  const accountId = req.params.accountId;
  const userId = req.userId!;

  const formattedCardNumber = number.replace(/\D/g, "");
  const registerCardService = makeRegisterCardService();

  try {
    const newCard = await registerCardService.execute({
      type,
      number: formattedCardNumber,
      cvv,
      accountId,
      userId,
    });

    const responseData = {
      id: newCard.id,
      type: newCard.type,
      number: formatCardNumber(newCard.number),
      cvv: newCard.cvv,
      createdAt: newCard.createdAt,
      updatedAt: newCard.updatedAt,
    };

    return res.status(201).send(responseData);
  } catch (error) {
    if (error instanceof AccountAlreadyHasPhysicalCardError) {
      return res.status(409).send({ message: error.message });
    }
    if (error instanceof CardAlreadyExistsError) {
      return res.status(409).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
