import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Transaction } from "@/services/supabase";
import { formatCurrencyBRL } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onDelete?: (id: number) => Promise<void> | void;
};

export default function TransactionDetailsModal({ open, onOpenChange, transaction, onDelete }: Props) {
  if (!transaction) return null;

  const isIncome = transaction.type === 'income';
  const isExpense = transaction.type === 'expense';
  const isInvestment = transaction.type === 'investment';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes da Transação</DialogTitle>
          <DialogDescription>Veja informações completas e gerencie esta transação.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-semibold">{transaction.description || 'Sem descrição'}</p>
              <p className="text-sm text-muted-foreground">{transaction.category || 'Sem categoria'}</p>
            </div>
            <Badge variant="secondary">
              {isIncome ? 'Entrada' : isExpense ? 'Saída' : isInvestment ? 'Investimento' : transaction.type}
            </Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Valor</p>
              <p className={`font-semibold ${isIncome ? 'text-income' : isExpense ? 'text-expense' : 'text-investment'}`}>
                {isIncome ? '+' : isExpense ? '-' : ''}{formatCurrencyBRL(Math.abs(transaction.amount))}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Data</p>
              <p className="font-semibold">{new Date(transaction.transaction_date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">ID</p>
              <p className="font-mono">{transaction.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Criado em</p>
              <p>{new Date(transaction.created_at).toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Fechar</Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Apagar transação</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Tem certeza que deseja apagar esta transação?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      if (onDelete) await onDelete(transaction.id);
                    }}
                  >
                    Apagar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
