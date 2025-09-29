import { supabase } from "./client";
import { BudgetLimit } from "./tables";

export async function getBudgetLimits() {
  const budgets = await supabase().from("budget_limits_with_spent")
    .select("*")
    .order("category", { ascending: true });
  const items = budgets.data as BudgetLimit[]

  return items
}