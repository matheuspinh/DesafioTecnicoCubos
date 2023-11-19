export class DocumentAlreadyRegisteredError extends Error {
  constructor() {
    super(`Document already registered.`);
  }
}
