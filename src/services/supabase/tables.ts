export type User = {
  id: string
  name: string
}

export type Transaction = {
  id: string
  user_id: string
  type: 'income' | 'expense' | 'investment'
  amount: number
  category: string | null
  description: string | null
  transaction_date: any // ISO date string, e.g. '2024-06-13'
  created_at: string // ISO timestamp string
}

export type RecurringTransaction = Transaction & {
  frequency: 'daily' | 'weekly' | 'monthly';
}

export type BudgetLimit = {
  id: string;
  user_id: string;
  category: string;
  limit_amount: number;
  spent: number;
  percentage: number;
  created_at: string;
  transactions: Array<Transaction>;
};