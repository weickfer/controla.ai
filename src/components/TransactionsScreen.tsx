import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "lucide-react";
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

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(transaction => {
      if (!groups[transaction.date]) {
        groups[transaction.date] = [];
      }
      groups[transaction.date].push(transaction);
    });
    return groups;
  }, [transactions]);

  // Get sorted date keys (most recent first)
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    // Simple sorting by the numeric part of the date string
    const dayA = parseInt(a.split(' ')[0]);
    const dayB = parseInt(b.split(' ')[0]);
    return dayB - dayA;
  });

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <div className="px-6 py-4 lg:py-6 bg-card lg:bg-transparent">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1">
          Transações
        </h2>
        <p className="text-sm lg:text-base text-muted-foreground">
          {transactions.length} transações este mês
        </p>
      </div>

      {/* Transactions List Grouped by Date */}
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-6 lg:space-y-8 pb-6 lg:pb-8">
          {sortedDates.map((date, dateIndex) => (
            <div key={date} className="space-y-3 lg:space-y-4">
              {/* Date Header */}
              <div 
                className="flex items-center space-x-2 animate-fade-up"
                style={{ animationDelay: `${dateIndex * 0.1}s` }}
              >
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm lg:text-base font-semibold text-foreground">
                  {date}
                </h3>
                <div className="flex-1 h-px bg-border/50"></div>
              </div>

              {/* Transactions for this date */}
              <div className="space-y-3 lg:space-y-4">
                {groupedTransactions[date].map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${(dateIndex * 0.1) + (index * 0.05)}s` }}
                  >
                    <TransactionItem transaction={transaction} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}