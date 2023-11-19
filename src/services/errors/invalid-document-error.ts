export class InvalidDocumentError extends Error {
  constructor() {
    super(`Document is invalid.`);
  }
}
