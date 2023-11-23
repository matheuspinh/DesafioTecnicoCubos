import { isValidCNPJ, isValidCPF } from "@brazilian-utils/brazilian-utils";

export function validateDocument(document: string) {
  document = document.replace(/\D/g, "");

  if (document.length !== 11 && document.length !== 14) {
    return false;
  }

  if (document.length === 11) {
    return isValidCPF(document);
  }

  if (document.length === 14) {
    return isValidCNPJ(document);
  }
}
