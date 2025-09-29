import { RecurringTransaction } from "@/services/supabase";

export function getWeekDays(date: Date) {
  const result = [];

  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let first = day;
  while (first - 7 >= 1) {
    first -= 7;
  }

  for (let d = first; d <= daysInMonth; d += 7) {
    result.push(d);
  }

  return result;
}

// Calcula a próxima ocorrência baseada no dia recorrente e na data de inserção
export const getNextOccurrenceDate = (transaction: RecurringTransaction) => {
  const insertedDate = new Date(transaction.transaction_date);
  const now = new Date();
  let nextOccurrenceDate: Date;

  if(transaction.frequency === 'monthly') {
    const recurringDay = insertedDate.getDate();
    nextOccurrenceDate = new Date(now.getFullYear(), now.getMonth(), recurringDay);
    nextOccurrenceDate.setHours(0, 0, 0, 0);
    if (now > nextOccurrenceDate) {
      nextOccurrenceDate = new Date(now.getFullYear(), now.getMonth() + 1, recurringDay);
    }
  }

  if(transaction.frequency === 'weekly') {
    const availableDays = getWeekDays(insertedDate);
    const distances = availableDays.map((d, i) => [Math.abs(d - now.getDate()), i]).sort((a, b) => a[0] - b[0])
    const recurringDay = availableDays[distances[0][1]]

    nextOccurrenceDate = new Date(now.getFullYear(), now.getMonth(), recurringDay);
    nextOccurrenceDate.setHours(0, 0, 0, 0);
  }

  if(transaction.frequency === 'daily') {
    nextOccurrenceDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    nextOccurrenceDate.setHours(0, 0, 0, 0);
  }

  return { insertedDate, now, nextOccurrenceDate };
};