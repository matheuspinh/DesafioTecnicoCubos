import { AccountsRepository } from "@/repositories/accounts-repository";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";
import { InsufficientFundsError } from "../errors/insuficient-funds-error";

interface RegisterTransactionServiceRequest {
  accountId: string;
  description: string;
  value: number;
}

export class RegisterTransactionService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository
  ) {}

  async execute(data: RegisterTransactionServiceRequest) {
    const type = data.value > 0 ? "credit" : "debit";

    const accountBalance = await this.accountsRepository.getAccountBalance(
      data.accountId
    );

    if (accountBalance === null) {
      throw new CouldNotFoundAccountError();
    }

    if (accountBalance + data.value < 0) {
      throw new InsufficientFundsError();
    }

    const transaction = await this.transactionsRepository.create({
      accountId: data.accountId,
      type,
      description: data.description,
      value: data.value,
    });

    const balance = await this.accountsRepository.updateAccountBalance({
      accountId: data.accountId,
      value: data.value,
    });

    return { transaction, balance };
  }
}
