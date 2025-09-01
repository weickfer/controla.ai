import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Brain } from "lucide-react";

const summaryData = {
  income: 4300.00,
  expense: 322.40,
  balance: 3977.60
};

const categoryData = [
  { name: 'Alimentação', value: 250.00, color: '#ef4444' },
  { name: 'Transporte', value: 15.50, color: '#f97316' },
  { name: 'Delivery', value: 32.90, color: '#eab308' },
  { name: 'Lazer', value: 24.00, color: '#8b5cf6' }
];

const weeklyData = [
  { name: 'Sem 1', income: 800, expense: 150 },
  { name: 'Sem 2', income: 0, expense: 89 },
  { name: 'Sem 3', income: 0, expense: 83 },
  { name: 'Sem 4', income: 3500, expense: 0 }
];

export default function DashboardScreen() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Resumo financeiro de agosto
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4">
          {/* Balance Card */}
          <Card className="p-4 card-gradient">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Atual</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {summaryData.balance.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          {/* Income/Expense Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-income-bg rounded-full flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-income" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Entradas</p>
                  <p className="text-lg font-semibold text-income">
                    R$ {summaryData.income.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-expense-bg rounded-full flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 text-expense" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Saídas</p>
                  <p className="text-lg font-semibold text-expense">
                    R$ {summaryData.expense.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Pie Chart - Expenses by Category */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Gastos por Categoria
          </h3>
          <div className="h-48">
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
          <div className="space-y-2 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-foreground">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  R$ {category.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Bar Chart - Weekly Income vs Expense */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Entradas vs Saídas (Semanas)
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Bar dataKey="income" fill="hsl(var(--income))" radius={4} />
                <Bar dataKey="expense" fill="hsl(var(--expense))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-income rounded-full" />
              <span className="text-sm text-foreground">Entradas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-expense rounded-full" />
              <span className="text-sm text-foreground">Saídas</span>
            </div>
          </div>
        </Card>

        {/* AI Insight */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Insight da IA
              </p>
              <p className="text-sm text-muted-foreground">
                Seu gasto com delivery aumentou 20% essa semana. Que tal tentar cozinhar mais em casa?
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}