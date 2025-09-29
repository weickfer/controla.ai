import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNextOccurrenceDate, getWeekDays } from "@/lib/get-next-ocurrence";
import { cn, formatCurrencyBRL } from "@/lib/utils";
import { RecurringTransaction } from "@/services/supabase";
import { CalendarDays, RefreshCw } from "lucide-react";
import { useMemo } from "react";

type RecurringScreenProps = {
  data: RecurringTransaction[];
};

const frequencyLabel: Record<RecurringTransaction["frequency"], string> = {
  daily: "Diário",
  weekly: "Semanal",
  monthly: "Mensal",
};

const frequencyDescription: Record<RecurringTransaction["frequency"], string> = {
  daily: "Renova todos os dias",
  weekly: "Renova toda semana",
  monthly: "Renova todo mês",
};

function getFrequencyMultiplier(
  transaction: RecurringTransaction
): number {
  switch (transaction.frequency) {
    case "daily":
      return 30;
    case "weekly":
      return getWeekDays(new Date(transaction.transaction_date)).length;
    default:
      return 1;
  }
}

function getMonthlyEquivalent(transaction: RecurringTransaction): number {
  const baseAmount = Math.abs(transaction.amount);
  return baseAmount * getFrequencyMultiplier(transaction);
}

function formatDateLabel(value: RecurringTransaction["transaction_date"]): string {
  if (!value) return "Data não definida";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Data não definida";
  return parsed.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
}

export function RecurringScreen({ data }: RecurringScreenProps) {
  const summary = useMemo(() => {
    return data.reduce(
      (acc, transaction) => {
        const monthlyEquivalent = getMonthlyEquivalent(transaction);

        if (transaction.type === "income") acc.income += monthlyEquivalent;
        else if (transaction.type === "investment") acc.investment += monthlyEquivalent;
        else acc.expense += monthlyEquivalent;

        return acc;
      },
      { income: 0, expense: 0, investment: 0 }
    );
  }, [data]);

  const totalCommitment = summary.expense + summary.investment;
  const totalIncome = summary.income;
  const projectedBalance = totalIncome - totalCommitment;

  const sortedRecurring = useMemo(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.transaction_date ?? "").getTime();
      const dateB = new Date(b.transaction_date ?? "").getTime();

      if (Number.isNaN(dateA) && Number.isNaN(dateB)) return 0;
      if (Number.isNaN(dateA)) return 1;
      if (Number.isNaN(dateB)) return -1;

      return dateA - dateB;
    });
  }, [data]);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="px-6 py-4 lg:py-6 bg-card lg:bg-transparent">
        <div className="flex items-center gap-2 mb-1">
          <RefreshCw className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Recorrências</h2>
        </div>
        <p className="text-sm lg:text-base text-muted-foreground">
          {data.length === 0
            ? "Nenhum lançamento recorrente cadastrado ainda"
            : `${data.length} ${data.length === 1 ? "lançamento" : "lançamentos"} recorrente${data.length === 1 ? "" : "s"}`}
        </p>
      </div>

      <ScrollArea className="flex-1 px-6">
        {data.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-center py-16 text-muted-foreground text-sm lg:text-base">
            Cadastre assinaturas, contas fixas e demais lançamentos recorrentes para acompanhá-los aqui.
          </div>
        ) : (
          <div className="space-y-4 lg:space-y-5 pb-6 lg:pb-8">
            <Card className="p-4 lg:p-5 border border-border/60 bg-muted/40">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Compromissos</p>
                  <p className="text-lg lg:text-xl font-semibold text-expense">
                    {formatCurrencyBRL(totalCommitment)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Entradas recorrentes</p>
                  <p className="text-lg lg:text-xl font-semibold text-income">
                    {formatCurrencyBRL(totalIncome)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Saldo projetado</p>
                  <p className={cn(
                    "text-lg lg:text-xl font-semibold",
                    projectedBalance >= 0 ? "text-income" : "text-expense"
                  )}>
                    {formatCurrencyBRL(projectedBalance)}
                  </p>
                </div>
              </div>
            </Card>

            {sortedRecurring.map((transaction, index) => {
              const monthlyEquivalent = getMonthlyEquivalent(transaction);
              const { nextOccurrenceDate } = getNextOccurrenceDate(transaction);

              const nextOccurrence = formatDateLabel(nextOccurrenceDate.toISOString());
              const isIncome = transaction.type === "income";
              const isInvestment = transaction.type === "investment";
              const amountClass = isIncome ? "text-income" : isInvestment ? "text-investment" : "text-expense";
              const sign = isIncome ? "+" : "-";

              return (
                <Card
                  key={transaction.id ?? `${transaction.description}-${index}`}
                  className="p-4 lg:p-5 border border-border/60 hover:border-border transition-all duration-200 animate-fade-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm lg:text-base font-semibold text-foreground capitalize">
                          {transaction.category || "Sem categoria"}
                        </p>
                        <Badge variant="secondary">
                          {frequencyLabel[transaction.frequency] ?? transaction.frequency}
                        </Badge>
                      </div>
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        {transaction.description || "Sem descrição"}
                      </p>
                      <div className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground">
                        <CalendarDays className="w-4 h-4" />
                        <span>Próximo lançamento: {nextOccurrence}</span>
                      </div>
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        {frequencyDescription[transaction.frequency] ?? "Recorrência"}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className={cn("text-lg lg:text-xl font-bold", amountClass)}>
                        {sign}
                        {formatCurrencyBRL(Math.abs(transaction.amount))}
                      </p>
                      <p className="text-xs lg:text-sm text-muted-foreground">
                        Estimativa mensal {sign}
                        {formatCurrencyBRL(monthlyEquivalent)}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
