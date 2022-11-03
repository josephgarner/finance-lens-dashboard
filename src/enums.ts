export enum Endpoint {
  UploadTransactionRecord = "upload-history",
  ListAllTransactions = "list-all",
  ListUnsanitizedTransactions = "list-unsanitized",
  UpdateTransaction = "update",
  AddSanitizing = "add-sanitizing",
  RunSanitization = "run-sanitization/:account",
  ListAllSanitizing = "list-sanitizing",

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
  ListAllSanitizing = "list-all-sanitizing",

  ListAllAccounts = "list-all-accounts",
}

export enum Bank {
  ING = "ING",
}

export enum Paths {
  Transactions = "/",
  SanitizeTransactions = "/sanitize-transactions",
  Accounts = "/accounts",
}
