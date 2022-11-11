export enum Endpoint {
  UploadTransactionRecord = "upload-history",
  ListAllTransactions = "list-all",
  ListUnsanitizedTransactions = "list-unsanitized",
  ListAllTransactionsPerAccount = "list-all/:account",
  ListUnsanitizedTransactionsPerAccount = "list-unsanitized/:account",
  UpdateTransaction = "update",
  AddSanitizing = "add-sanitizing",
  RunSanitization = "run-sanitization/:account",
  ListAllSanitizing = "list-sanitizing",
  UpdateSanitization = "update-sanitizing",
  DeleteSanitizing = "delete-sanitizing",

  ListAllAccounts = "list-all",
  CreateAccount = "create",
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

export enum AccountType {
  SPENDING = "Spending",
  SAVINGS = "Savings",
  TERMDEPOSIT = "Term Deposit",
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
  Home = "/",
  Transactions = "/transactions",
  SanitizeTransactions = "/sanitize-transactions",
  Accounts = "/accounts",
  Login = "/login",
}
