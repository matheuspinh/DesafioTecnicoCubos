import { AccountsRepository } from "@/repositories/accounts-repository";
import { AccountAlreadyRegisteredError } from "../errors/account-already-registered-error";

interface RegisterAccountServiceRequest {
  branch: string;
  account: string;
  userId: string;
  balance?: number;
}
export class RegisterAccountService {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute(data: RegisterAccountServiceRequest) {
    const accountAlreadyExists = await this.accountsRepository.findByAccount(
      data.account
    );

    if (accountAlreadyExists) {
      throw new AccountAlreadyRegisteredError();
    }

    const account = await this.accountsRepository.create({
      branch: data.branch,
      account: data.account,
      userId: data.userId,
      balance: data.balance ?? 0,
    });

    return account;
  }
}
