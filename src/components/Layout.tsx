import { useState } from "react";
import { BarChart3, Receipt, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TransactionsScreen from "./TransactionsScreen";
import DashboardScreen from "./DashboardScreen";
import TransactionModal from "./TransactionModal";

type Screen = 'transactions' | 'dashboard';

export default function Layout() {
  const [activeScreen, setActiveScreen] = useState<Screen>('transactions');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="px-6 py-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Olá, Eduardo 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Como estão suas finanças hoje?
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeScreen === 'transactions' && <TransactionsScreen />}
        {activeScreen === 'dashboard' && <DashboardScreen />}
      </main>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 z-40"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-6 py-3 safe-area-pb">
        <div className="flex justify-center space-x-8">
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all duration-200",
              activeScreen === 'transactions' 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveScreen('transactions')}
          >
            <Receipt className="w-6 h-6" />
            <span className="text-xs font-medium">Transações</span>
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-xl transition-all duration-200",
              activeScreen === 'dashboard' 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setActiveScreen('dashboard')}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs font-medium">Gráficos</span>
          </Button>
        </div>
      </nav>

      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}