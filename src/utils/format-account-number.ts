export function formatAccountNumber(account: string) {
  const formattedAccountNumber = `${account.slice(0, -1)}-${account.slice(-1)}`;

  return formattedAccountNumber;
}
