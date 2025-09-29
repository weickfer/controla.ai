import { ScrollArea } from "@/components/ui/scroll-area";
import { dateFriendly } from "@/lib/date-friendly";
import { Transaction } from "@/services/supabase";
import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import TransactionDetailsModal from "./components/transaction-details-modal";
import TransactionItem from "./components/transaction-item";


type TransactionProps = {
  data: Transaction[];
  onDeleteTransaction?: (id: number) => Promise<void> | void;
};

export function TransactionsScreen({ data: transactions, onDeleteTransaction }: TransactionProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Transaction | null>(null);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    transactions.forEach(transaction => {
      if (!groups[transaction.transaction_date]) {
        groups[transaction.transaction_date] = [];
      }
      groups[transaction.transaction_date].push(transaction);
    });
    return groups;
  }, [transactions]);

  // Get sorted date keys (most recent first)
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => {
    // Sort by date descending (most recent first)
    // Handles ISO date strings like "2025-09-07"
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
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
                  {dateFriendly(date)}
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
                    <TransactionItem 
                      transaction={transaction} 
                      onClick={() => { setSelected(transaction); setOpen(true); }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <TransactionDetailsModal 
        open={open}
        onOpenChange={(o) => { if (!o) setSelected(null); setOpen(o); }}
        transaction={selected}
        onDelete={async (id) => {
          await onDeleteTransaction?.(id);
          setOpen(false);
          setSelected(null);
        }}
      />
    </div>
  );
}
