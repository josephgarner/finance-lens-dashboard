export enum Endpoint {
  ListAllTransactions = "list-all",
  ListUnsanitizedTransactions = "list-unsanitized",
  UpdateTransaction = "update",
  AddSanitizing = "add-sanitizing",
  RunSanitization = "run-sanitization/:account",

  ListAllAccounts = "list-all",
}

export enum Service {
  Transaction = "transaction",
  Account = "account",
}

export enum TransactionType {
  EXPENSE = "Expense",
  INCOME = "Income",
  TRANSFER = "Transfer",
}

export enum QueryKey {
  ListAllTransactions = "list-all-transactions",
  ListUnsanitizedTransactions = "list-unsanitized-transactions",

  ListAllAccounts = "list-all-accounts",
}

export enum Bank {
  ING = "ING",
}
