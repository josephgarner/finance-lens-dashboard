export enum Endpoint {
  UploadTransactionRecord = "upload-history",
  ListAllTransactions = "list-all",
  ListUnsanitizedTransactions = "list-unsanitized",
  ListAllTransactionsPerAccount = "list-all",
  ListUnsanitizedTransactionsPerAccount = "list-unsanitized",
  UpdateTransaction = "update",
  AddSanitizing = "add-sanitizing",
  RunSanitization = "run-sanitization",
  ListAllSanitizing = "list-sanitizing",
  UpdateSanitization = "update-sanitizing",
  DeleteSanitizing = "delete-sanitizing",
  ListCategoies = "list-categories",

  ListAllAccounts = "list-all",
  CreateAccount = "create",

  DeleteAll = "delete-data",
}

export enum Service {
  Transaction = "transaction",
  Account = "account",
  Core = "core",
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
  ListCategoies = "list-categories",

  ListAllAccounts = "list-all-accounts",
}

export enum Bank {
  ING = "ING",
}

export enum Paths {
  Home = "/",
  Transactions = "/transactions",
  UploadRecord = "/transactions/upload-record",
  SanitizeTransactions = "/sanitize-transactions",
  Accounts = "/accounts",
  Login = "/login",
}
