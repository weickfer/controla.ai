import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TransactionItem from "./TransactionItem";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  emoji: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    category: 'Alimentação',
    description: 'Mercado',
    amount: 250.00,
    date: '28 Ago',
    emoji: '🛒'
  },
  {
    id: '2',
    type: 'income',
    category: 'Salário',
    description: 'Pagamento mensal',
    amount: 3500.00,
    date: '27 Ago',
    emoji: '💰'
  },
  {
    id: '3',
    type: 'expense',
    category: 'Transporte',
    description: 'Uber',
    amount: 15.50,
    date: '27 Ago',
    emoji: '🚗'
  },
  {
    id: '4',
    type: 'expense',
    category: 'Delivery',
    description: 'iFood',
    amount: 32.90,
    date: '26 Ago',
    emoji: '🍕'
  },
  {
    id: '5',
    type: 'income',
    category: 'Freelance',
    description: 'Projeto web',
    amount: 800.00,
    date: '25 Ago',
    emoji: '💻'
  },
  {
    id: '6',
    type: 'expense',
    category: 'Lazer',
    description: 'Cinema',
    amount: 24.00,
    date: '24 Ago',
    emoji: '🎬'
  }
];

export default function TransactionsScreen() {
  const [transactions] = useState<Transaction[]>(mockTransactions);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 bg-card">
        <h2 className="text-xl font-semibold text-foreground mb-1">
          Transações
        </h2>
        <p className="text-sm text-muted-foreground">
          {transactions.length} transações este mês
        </p>
      </div>

      {/* Transactions List */}
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-3 pb-6">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TransactionItem transaction={transaction} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}