import { Account } from "types";

export const listAllAccountNames = (accounts: Account[]) => {
  const accountNames = accounts.map((account) => account.accountName);
  return accountNames;
};
