export class InvalidCardNumber extends Error {
  constructor() {
    super(`Invalid card number.`);
  }
}
