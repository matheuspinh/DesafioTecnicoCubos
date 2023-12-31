import { AccountsRepository } from "@/repositories/accounts-repository";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";

export class GetAccountBalanceService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(accountId: string) {
    const balance = await this.accountsRepository.getAccountBalance(accountId);

    if (balance === null) {
      throw new CouldNotFoundAccountError();
    }
    return balance;
  }
}
