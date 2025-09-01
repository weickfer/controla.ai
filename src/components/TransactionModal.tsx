import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: 'alimentacao', label: 'Alimentação', emoji: '🛒' },
  { value: 'transporte', label: 'Transporte', emoji: '🚗' },
  { value: 'delivery', label: 'Delivery', emoji: '🍕' },
  { value: 'lazer', label: 'Lazer', emoji: '🎬' },
  { value: 'salario', label: 'Salário', emoji: '💰' },
  { value: 'freelance', label: 'Freelance', emoji: '💻' },
  { value: 'outros', label: 'Outros', emoji: '📋' }
];

export default function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally save the transaction
    toast({
      title: "Transação adicionada!",
      description: `${type === 'income' ? 'Entrada' : 'Saída'} de R$ ${amount} foi registrada.`,
    });

    // Reset form and close modal
    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
  };

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Nova Transação
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Tipo</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as 'income' | 'expense')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="expense" id="expense" className="peer sr-only" />
                <Label
                  htmlFor="expense"
                  className="flex items-center justify-center space-x-2 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-expense peer-data-[state=checked]:bg-expense-bg peer-data-[state=checked]:text-expense cursor-pointer transition-all"
                >
                  <ArrowDownRight className="w-4 h-4" />
                  <span className="text-sm font-medium">Saída</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="income" id="income" className="peer sr-only" />
                <Label
                  htmlFor="income"
                  className="flex items-center justify-center space-x-2 rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-income peer-data-[state=checked]:bg-income-bg peer-data-[state=checked]:text-income cursor-pointer transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">Entrada</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Valor *
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center space-x-2">
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descrição *
            </Label>
            <Input
              id="description"
              placeholder="Ex: Mercado, Uber, Salário..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:opacity-90"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}