export class AccountAlreadyHasPhysicalCardError extends Error {
  constructor() {
    super(`Account already has a physical card.`);
  }
}
