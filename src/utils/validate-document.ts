export function validateDocument(document: string) {
  document = document.replace(/\D/g, "");

  if (document.length !== 11 && document.length !== 14) {
    return false;
  }

  //Inserir outras etapas de validação de documento

  return true;
}
