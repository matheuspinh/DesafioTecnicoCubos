export class CardAlreadyExistsError extends Error {
  constructor() {
    super(`Card Already Exists.`);
  }
}
