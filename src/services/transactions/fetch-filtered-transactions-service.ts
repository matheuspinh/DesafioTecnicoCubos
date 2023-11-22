import {
  FetchFilteredTransactionsData,
  TransactionsRepository,
} from "@/repositories/transactions-repository";

export class FetchFilteredTransactionsService {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(data: FetchFilteredTransactionsData) {
    const { transactions, totalTransactions } =
      await this.transactionsRepository.fetchFilteredTransactions(data);

    return { transactions, totalTransactions };
  }
}
