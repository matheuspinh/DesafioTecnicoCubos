export class CouldNotFoundAccountError extends Error {
  constructor() {
    super(`Account not found.`);
  }
}
