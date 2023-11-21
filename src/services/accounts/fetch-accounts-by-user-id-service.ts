import {
  AccountsRepository,
  FetchByUserIdData,
} from "@/repositories/accounts-repository";

export class FetchAccountsByUserIdService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(data: FetchByUserIdData) {
    const { accounts, totalAccounts } =
      await this.accountsRepository.fetchByUserId(data);

    return { accounts, totalAccounts };
  }
}
