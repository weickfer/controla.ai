import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Transaction } from "@/services/supabase";

interface TransactionItemProps {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';

  console.log(transaction)

  return (
    <Card className="p-4 lg:p-5 hover:shadow-md transition-all duration-200 cursor-pointer touch-target border border-border/50 hover:border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 lg:space-x-4">
          {/* Category Icon */}
          {/* <div className={cn(
            "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-lg lg:text-xl",
            isIncome ? "bg-income-bg" : "bg-expense-bg"
          )}>
            {transaction}
          </div> */}
          
          {/* Transaction Details */}
          <div>
            <p className="text-sm lg:text-base font-medium text-foreground">
              {transaction.description}
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground">
              {transaction.category}
            </p>
          </div>
        </div>

        {/* Amount and Date */}
        <div className="text-right">
          <p className={cn(
            "text-lg lg:text-xl font-bold",
            isIncome ? "text-income" : "text-expense"
          )}>
            {isIncome ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
          </p>
          <p className="text-xs lg:text-sm text-muted-foreground">
            {transaction.transaction_date}
          </p>
        </div>
      </div>
    </Card>
  );
}

