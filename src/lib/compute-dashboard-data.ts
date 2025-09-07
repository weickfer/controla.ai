import { Transaction } from "@/services/supabase";


// paleta para categorias (fica estável por nome)
const CATEGORY_COLORS = [
  "hsl(0 72% 51%)",
  "hsl(25 95% 53%)",
  "hsl(43 96% 56%)",
  "hsl(271 76% 53%)",
  "hsl(200 98% 39%)",
  "hsl(138 72% 40%)",
  "hsl(330 81% 60%)",
  "hsl(12 88% 59%)",
  "hsl(340 82% 52%)",
  "hsl(60 90% 60%)",
  "hsl(120 60% 50%)",
  "hsl(210 80% 60%)",
  "hsl(280 70% 60%)",
  "hsl(190 60% 50%)",
  "hsl(30 100% 60%)",
  "hsl(50 100% 50%)",
  "hsl(160 80% 40%)",
  "hsl(220 90% 50%)",
  "hsl(300 60% 60%)",
  "hsl(10 80% 60%)",
  "hsl(80 70% 50%)",
  "hsl(240 70% 60%)",
  "hsl(100 60% 50%)",
  "hsl(200 60% 60%)",
  "hsl(260 80% 50%)",
  "hsl(180 70% 60%)",
  "hsl(320 60% 60%)",
  "hsl(140 80% 50%)"
];

function getColorForCategory(name: string, map = new Map<string, string>()) {
  if (map.has(name)) return map.get(name)!;
  const color = CATEGORY_COLORS[map.size % CATEGORY_COLORS.length];
  map.set(name, color);
  return color;
}

// semana dentro do mês (1..5), começando na segunda-feira
function getWeekIndexWithinMonth(d: Date) {
  const year = d.getFullYear();
  const month = d.getMonth(); // 0-11
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // 0 = segunda
  const index = Math.floor((startOffset + (d.getDate() - 1)) / 7) + 1;
  return `Sem ${index}`; // "Sem 1", "Sem 2", ...
}

export function computeDashboardData(transactions: Transaction[]) {
  // segurança: normalizar datas e valores
  const txs = transactions.map((t) => ({
    ...t,
    amount: Number(t.amount) || 0,
    date: t.transaction_date instanceof Date ? t.transaction_date : new Date(t.transaction_date),
    category: t.category || "Outros",
  }));

  // 1) resumo
  let income = 0;
  let expense = 0;
  let investment = 0;

  for (const t of txs) {
    // if (t.type === "income") income += t.amount;
    // else if (t.type === "expense") expense += t.amount;
    if(t.type === 'income') {
      income += t.amount  
    } else {//if(t.type === 'expense') {
      expense += t.amount
    }
  
    if(t.type === 'investment') {
      investment += t.amount
    }
  }

  expense -= investment
  

  const balance = income - expense - investment;
  const summaryData = {
    income: Number(income.toFixed(2)),
    expense: Number(expense.toFixed(2)),
    balance: Number(balance.toFixed(2)),
    investment: Number(investment.toFixed(2)) ?? 0,
  };

  // 2) categorias (somente expense)
  const categoryTotals = new Map<string, number>();
  for (const t of txs) {
    if (t.type !== "expense") continue;
    categoryTotals.set(t.category!, (categoryTotals.get(t.category!) || 0) + t.amount);
  }

  const colorMap = new Map<string, string>();
  const categoryData = Array.from(categoryTotals.entries()).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
    color: getColorForCategory(name, colorMap),
  }));

  // 3) semanas (income/expense por semana do mês)
  const weeklyTotals = new Map<
    string,
    { income: number; expense: number }
  >();

  for (const t of txs) {
    const label = getWeekIndexWithinMonth(t.date as Date);
    if (!weeklyTotals.has(label)) weeklyTotals.set(label, { income: 0, expense: 0 });
    const agg = weeklyTotals.get(label)!;
    if (t.type === "income") agg.income += t.amount;
    else agg.expense += t.amount;
  }

  // ordenar por número da semana (Sem 1, Sem 2, ...)
  const weeklyData = Array.from(weeklyTotals.entries())
    .sort((a, b) => {
      const ai = parseInt(a[0].replace(/\D/g, ""), 10);
      const bi = parseInt(b[0].replace(/\D/g, ""), 10);
      return ai - bi;
    })
    .map(([name, { income, expense }]) => ({
      name,
      income: Number(income.toFixed(2)),
      expense: Number(expense.toFixed(2)),
    }));

  return { summaryData, categoryData, weeklyData };
}
