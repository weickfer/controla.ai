import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  date: string;
  emoji: string;
}

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer touch-target">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Category Icon */}
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-lg",
            isIncome ? "bg-income-bg" : "bg-expense-bg"
          )}>
            {transaction.emoji}
          </div>
          
          {/* Transaction Details */}
          <div>
            <p className="text-sm font-medium text-foreground">
              {transaction.description}
            </p>
            <p className="text-xs text-muted-foreground">
              {transaction.category}
            </p>
          </div>
        </div>

        {/* Amount and Date */}
        <div className="text-right">
          <p className={cn(
            "text-lg font-semibold",
            isIncome ? "text-income" : "text-expense"
          )}>
            {isIncome ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground">
            {transaction.date}
          </p>
        </div>
      </div>
    </Card>
  );
}