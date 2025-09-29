export function dateFriendly(date: string | Date): string {
  // Accepts a date string (ISO) or Date object, returns a friendly label in pt-BR
  // Ajusta para o UTC-3 (São Paulo)
  const now = new Date();
  const today = new Date(now.getTime() - (now.getTimezoneOffset() * 60000) - (3 * 60 * 60 * 1000));
  const txDate = typeof date === "string" ? new Date(date) : date;

  // Zera horas para comparar só a data
  const todayYMD = today.toISOString().slice(0, 10);
  const txYMD = txDate.toISOString().slice(0, 10);

  console.log(todayYMD, txYMD)

  if (txYMD === todayYMD) return "Hoje";

  // Ontem
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayYMD = yesterday.toISOString().slice(0, 10);
  if (txYMD === yesterdayYMD) return "Ontem";

  // Dia da semana (em português)
  const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  // Se for na mesma semana (últimos 7 dias, mas não hoje/ontem)
  const diff = Math.floor((today.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 7 && diff > 1) {
    return dias[txDate.getDay()];
  }

  // Se não, mostra data formatada (ex: 07/09/2025)
  return txDate.toLocaleDateString("pt-BR");
}
