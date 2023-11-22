import { AccountsRepository } from "@/repositories/accounts-repository";
import { TransactionsRepository } from "@/repositories/transactions-repository";
import { TransactionNotFound } from "../errors/transaction-not-found";
import { CouldNotFoundAccountError } from "../errors/could-not-find-account-error";
import { InsufficientFundsError } from "../errors/insuficient-funds-error";

interface RevertTransactionServiceRequest {
  transactionId: string;
  accountId: string;
  description: string;
}

export class RevertTransactionService {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private accountsRepository: AccountsRepository
  ) {}

  async execute(data: RevertTransactionServiceRequest) {
    const transaction = await this.transactionsRepository.findTransactionById(
      data.transactionId
    );
    if (transaction === null) {
      throw new TransactionNotFound();
    }

    const accountBalance = await this.accountsRepository.getAccountBalance(
      data.accountId
    );
    if (accountBalance === null) {
      throw new CouldNotFoundAccountError();
    }

    if (accountBalance - transaction.value < 0) {
      throw new InsufficientFundsError();
    }

    const revertedTransaction =
      await this.transactionsRepository.updateTransaction({
        id: data.transactionId,
        accountId: data.accountId,
        type: transaction.type === "credit" ? "debit" : "credit",
        description: data.description,
        value: transaction.value * -1,
      });

    const balance = await this.accountsRepository.updateAccountBalance({
      accountId: data.accountId,
      value: transaction.value * -1,
    });

    return revertedTransaction;
  }
}
