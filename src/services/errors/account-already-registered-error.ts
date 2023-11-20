export class AccountAlreadyRegisteredError extends Error {
  constructor() {
    super(`Account already registered.`);
  }
}
