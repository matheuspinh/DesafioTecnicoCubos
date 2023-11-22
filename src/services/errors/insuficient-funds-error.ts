export class InsufficientFundsError extends Error {
  constructor() {
    super(`Account does not have enough funds.`);
  }
}
