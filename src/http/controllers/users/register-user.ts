import { DocumentAlreadyRegisteredError } from "@/services/errors/document-already-registered-error";
import { InvalidDocumentError } from "@/services/errors/invalid-document-error";
import { MakeRegisterNewUserService } from "@/services/factories/make-register-new-user-service";
import { formatDocument } from "@/utils/format-document";
import { Request, Response } from "express";

export async function registerUser(req: Request, res: Response) {
  try {
    const { name, document, password } = req.body;

    const formattedDocument = formatDocument(document);

    const registerNewUserService = MakeRegisterNewUserService();
    const user = await registerNewUserService.execute({
      name,
      document: formattedDocument,
      password,
    });

    const replyData = {
      id: user.id,
      name: user.name,
      document: user.document,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(201).send(replyData);
  } catch (error) {
    if (error instanceof DocumentAlreadyRegisteredError) {
      return res.status(409).send({ message: error.message });
    }
    if (error instanceof InvalidDocumentError) {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
