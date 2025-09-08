import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { computeDashboardData } from "@/lib/compute-dashboard-data";
import { Transaction } from "@/services/supabase";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type DashboardScreenProps = {
  data: Transaction[]
}

export default function DashboardScreen({ data }: DashboardScreenProps) {
  const { categoryData, summaryData, weeklyData } = computeDashboardData(data)
  return (
    <div className="h-full w-full">
      <ScrollArea className="h-full">
        <div className="p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Header */}
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1">
              Dashboard
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              Resumo financeiro de agosto
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Balance Card */}
            <Card className="p-4 lg:p-6 card-gradient lg:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm lg:text-base text-muted-foreground">Saldo Atual</p>
                  <p className="text-2xl lg:text-3xl font-bold text-foreground">
                    R$ {summaryData.balance.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                </div>
              </div>
            </Card>

            {/* Income Card */}
            <Card className="p-2 lg:p-4 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-income-bg rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-income" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Entradas</p>
                  <p className="text-lg lg:text-xl font-semibold text-income">
                    R$ {summaryData.income.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Expense Card */}
            <Card className="p-2 lg:p-4 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-expense-bg rounded-full flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 lg:w-6 lg:h-6 text-expense" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Saídas</p>
                  <p className="text-lg lg:text-xl font-semibold text-expense">
                    R$ {summaryData.expense.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-2 lg:p-4 lg:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-investment-bg rounded-full flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 lg:w-6 lg:h-6 text-investment" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Investimentos</p>
                  <p className="text-lg lg:text-xl font-semibold text-investment">
                    R$ {summaryData.investment.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Pie Chart - Expenses by Category */}
            <Card className="p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-bold text-foreground mb-4 lg:mb-6">
                Gastos por Categoria
              </h3>
              <div className="h-48 lg:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 lg:space-y-3 mt-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 lg:w-4 lg:h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm lg:text-base text-foreground">{category.name}</span>
                    </div>
                    <span className="text-sm lg:text-base font-medium text-foreground">
                      R$ {category.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bar Chart - Weekly Income vs Expense */}
            <Card className="p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-bold text-foreground mb-4 lg:mb-6">
                Entradas vs Saídas (Semanas)
              </h3>
              <div className="h-48 lg:h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Bar dataKey="income" fill="hsl(142 71% 45%)" radius={4} />
                    <Bar dataKey="expense" fill="hsl(0 72% 51%)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-income rounded-full" />
                  <span className="text-sm lg:text-base text-foreground">Entradas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-expense rounded-full" />
                  <span className="text-sm lg:text-base text-foreground">Saídas</span>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Insight */}
          {/* <Card className="p-4 lg:p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start space-x-3 lg:space-x-4">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm lg:text-base font-medium text-foreground mb-1">
                  Insight da IA
                </p>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Seu gasto com delivery aumentou 20% essa semana. Que tal tentar cozinhar mais em casa?
                </p>
              </div>
            </div>
          </Card> */}
        </div>
      </ScrollArea>
    </div>
  );
}

