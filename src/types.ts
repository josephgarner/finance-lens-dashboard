import { Bank, TransactionType } from "enums";

export type Transaction = {
  date: Date;
  rawDescription: string;
  sanitizedDescription?: string;
  account: string;
  type: TransactionType;
  category?: string;
  subcategory?: string;
  vendor?: string;
  credit: number;
  debit: number;
  balance: number;
};
export type Account = {
  accountName: string;
  accountType?: string;
  balance?: number;
  bank: Bank;
  balanceSince?: Date;
};

export type Sanitization = {
  id?: string;
  keywords: string[];
  sanitizedDescription: string;
  type: TransactionType;
  category: string;
  subcategory?: string;
  vendor: string;
};
