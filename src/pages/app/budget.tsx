import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dateFriendly } from "@/lib/date-friendly";
import { cn } from "@/lib/utils";
import { getBudgetLimits } from "@/services/supabase/budget-limits";
import { BudgetLimit } from "@/services/supabase/tables";
import { AlertTriangle, ChevronDown, Target, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BudgetScreen() {
  const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    getBudgetLimits().then(data => {
      setBudgetLimits(data)
    })
  }, [])

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getBudgetStatus = (percentage: number) => {
    if (percentage >= 100) return "exceeded";
    if (percentage >= 60) return "warning";
    return "safe";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeded": return "text-destructive";
      case "warning": return "text-yellow-600";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "exceeded": return <AlertTriangle className="w-4 h-4" />;
      case "warning": return <TrendingUp className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col w-full">
      {/* Header */}
      <div className="p-6 lg:p-8 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <h1 className="text-2xl lg:text-3xl font-bold">Limites de Gastos</h1>
        <p className="text-muted-foreground mt-1 lg:mt-2">
          Acompanhe seus gastos por categoria
        </p>
      </div>

      {/* Budget Limits List */}
      <ScrollArea className="flex-1 px-6">
        <div className="space-y-4 py-6 lg:py-8">
          {budgetLimits.map((budget, index) => {
            const spent = budget.spent || 0;
            const percentage = budget.percentage * 100;
            const status = getBudgetStatus(percentage);
            const isExpanded = expandedCategories.has(budget.category);
            const categoryTransactions = budget.transactions;

            return (
              <Card 
                key={budget.id}
                className="animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Collapsible
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(budget.category)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors p-4 lg:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 lg:space-x-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm lg:text-base">
                              {budget.category}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={cn("text-xs lg:text-sm", getStatusColor(status))}>
                                R$ {spent.toFixed(2)} de R$ {budget.limit_amount.toFixed(2)}
                              </span>
                              {getStatusIcon(status)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-3">
                          <Badge variant={status === "exceeded" ? "destructive" : status === "warning" ? "default" : "secondary"}>
                            {percentage.toFixed(0)}%
                          </Badge>
                          <ChevronDown 
                            className={cn(
                              "w-4 h-4 transition-transform duration-200",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-3 lg:mt-4">
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              status === "exceeded" ? "bg-destructive" : 
                              status === "warning" ? "bg-yellow-500" : "bg-primary"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0 p-4 lg:p-6">
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-3 flex items-center">
                          <TrendingDown className="w-4 h-4 mr-2" />
                          Transações da categoria ({categoryTransactions.length})
                        </h4>
                        
                        {categoryTransactions.length > 0 ? (
                          <div className="space-y-2 lg:space-y-3">
                            {categoryTransactions.map((transaction) => (
                              <div 
                                key={transaction.id}
                                className="flex items-center justify-between p-3 lg:p-4 bg-muted/30 rounded-lg"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm lg:text-base truncate capitalize">
                                    {transaction.description}
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">
                                    {dateFriendly(transaction.transaction_date)}
                                  </p>
                                </div>
                                <div className="text-right ml-3">
                                  <p className="font-semibold text-sm lg:text-base text-destructive">
                                    -R$ {transaction.amount.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            <p className="text-sm">Nenhuma transação nesta categoria</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}