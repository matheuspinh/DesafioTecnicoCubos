import { AccountsRepository } from "@/repositories/accounts-repository";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";

export class GetAccountById {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(accountId: string) {
    const account = await this.accountsRepository.findById(accountId);

    if (account === null) {
      throw new CouldNotFoundAccountError();
    }

    return account;
  }
}
