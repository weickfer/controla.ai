import { BarChart3, CalendarCheck, Goal, Receipt } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { deleteTransaction, getUserData, RecurringTransaction, Transaction } from "@/services/supabase";

import { AuthRequiredView } from "./auth";
import { BudgetScreen } from "./budget";
import { DashboardScreen } from "./dashboard";
import { LoadingView } from "./loading";
import { RecurringScreen } from "./recurring";
import { TransactionsScreen } from "./transactions";

// Tipos
type Screen = "transactions" | "dashboard" | "recurring" | "budget";

type User = {
  id: string
  name: string
}

export function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("dashboard");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // Novo estado do fluxo de auth
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [recurring, setRecurring] = useState<RecurringTransaction[]>([])
  const { toast } = useToast();

  // Computado: está autenticado quando há usuário carregado
  const isAuthenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    getUserData().then(({ data, error }) => {
      setIsLoading(false)
      if(error) {
        setAuthError(error)
        return
      }

      setUser(data.user)
      setTransactions(data?.transactions ?? [])
      setRecurring(data?.recurring ?? [])
    })
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  if (!isAuthenticated) {
    return <AuthRequiredView authError={authError} />;
  }

  // Render principal quando autenticado
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop and Mobile Container */}
      <div className="mx-auto max-w-md lg:max-w-4xl xl:max-w-6xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:p-8 min-h-screen">
          {/* Mobile Layout / Desktop Left Panel */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col min-h-screen lg:min-h-[calc(100vh-4rem)] lg:bg-card lg:rounded-2xl lg:shadow-lg lg:border lg:border-border">
            {/* Header */}
            <header className="px-6 py-6 bg-card lg:bg-transparent border-b border-border lg:border-none">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground">
                    Olá, {user?.name} 👋
                  </h1>
                  <p className="text-sm lg:text-base text-muted-foreground mt-1">
                    Como estão suas finanças hoje?
                  </p>
                </div>
              </div>
            </header>

            {/* Mobile Navigation */}
            <nav className="lg:hidden bg-card border-b border-border px-6 py-3">
              <div className="flex justify-center space-x-8">
              <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-3 px-4 rounded-xl transition-all duration-200",
                    activeScreen === "dashboard"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveScreen("dashboard")}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-xs font-medium">Gráficos</span>
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-3 px-4 rounded-xl transition-all duration-200",
                    activeScreen === "transactions"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveScreen("transactions")}
                >
                  <Receipt className="w-5 h-5" />
                  <span className="text-xs font-medium">Transações</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-3 px-4 rounded-xl transition-all duration-200",
                    activeScreen === "recurring"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveScreen("recurring")}
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span className="text-xs font-medium">Gastos Recorrentes</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "flex flex-col items-center gap-1 h-auto py-3 px-4 rounded-xl transition-all duration-200",
                    activeScreen === "budget"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setActiveScreen("budget")}
                >
                  <Goal className="w-5 h-5" />
                  <span className="text-xs font-medium">Gastos Recorrentes</span>
                </Button>
              </div>
            </nav>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block px-6 pb-4">
              <div className="space-y-2">
              <Button
                  variant={activeScreen === "dashboard" ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left transition-all duration-200",
                    activeScreen === "dashboard" && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setActiveScreen("dashboard")}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </Button>

                <Button
                  variant={activeScreen === "transactions" ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left transition-all duration-200",
                    activeScreen === "transactions" && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setActiveScreen("transactions")}
                >
                  <Receipt className="w-5 h-5 mr-3" />
                  Transações
                </Button>
                
                <Button
                  variant={activeScreen === "recurring" ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left transition-all duration-200",
                    activeScreen === "recurring" && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setActiveScreen("recurring")}
                >
                  <CalendarCheck className="w-5 h-5 mr-3" />
                  Gastos Recorrentes
                </Button>

                <Button
                  variant={activeScreen === "budget" ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left transition-all duration-200",
                    activeScreen === "budget" && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setActiveScreen("budget")}
                >
                  <Goal className="w-5 h-5 mr-3" />
                  Limites
                </Button>
              </div>
            </nav>

            {/* Mobile Content */}
            <main className="lg:hidden flex-1 overflow-hidden">
              {activeScreen === "transactions" && (
                <TransactionsScreen 
                  data={transactions}
                  onDeleteTransaction={async (id) => {
                    const { error } = await deleteTransaction(id);
                    if (error) {
                      toast({ title: "Erro ao apagar", description: "Tente novamente.", variant: "destructive" });
                      return;
                    }
                    setTransactions((prev) => prev.filter((t) => t.id !== id));
                    toast({ title: "Transação apagada", description: "A transação foi removida com sucesso." });
                  }}
                />
              )}
              {activeScreen === "dashboard" && <DashboardScreen data={transactions} />}
              {activeScreen === "recurring" && <RecurringScreen data={recurring} />}
              {activeScreen === "budget" && <BudgetScreen />}
            </main>
          </div>

          {/* Desktop Right Panel - Content */}
          <div className="hidden lg:flex lg:col-span-7 xl:col-span-8 lg:bg-card lg:rounded-2xl lg:shadow-lg lg:border lg:border-border overflow-hidden">
            {activeScreen === "transactions" && (
              <TransactionsScreen 
                data={transactions}
                onDeleteTransaction={async (id) => {
                  const { error } = await deleteTransaction(id);
                  if (error) {
                    toast({ title: "Erro ao apagar", description: "Tente novamente.", variant: "destructive" });
                    return;
                  }
                  setTransactions((prev) => prev.filter((t) => t.id !== id));
                  toast({ title: "Transação apagada", description: "A transação foi removida com sucesso." });
                }}
              />
            )}
            {activeScreen === "dashboard" && <DashboardScreen data={transactions} />}
            {activeScreen === "recurring" && <RecurringScreen data={recurring} />}
            {activeScreen === "budget" && <BudgetScreen />}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      {/* <Button
        size="lg"
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-50"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-6 h-6 lg:w-7 lg:h-7 text-primary-foreground" />
      </Button> */}

      {/* Transaction Modal */}
      {/* <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  );
}
