import { Button } from "@/components/ui/button";
import { Gift, MessageCircle, Sparkles } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary-light/90" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Comece agora.{" "}
            <span className="text-white drop-shadow-lg">
              Grátis e sem planilhas.
            </span>
          </h2>
          
          <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-md">
            Transforme a forma como você cuida do seu dinheiro. 
            Em menos de 1 minuto você já está registrando seus gastos.
          </p>
          
          {/* Features grid */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <Gift className="w-6 h-6 text-white mx-auto mb-2 drop-shadow-sm" />
              <div className="text-white font-medium text-sm drop-shadow-sm">Totalmente gratuito</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <MessageCircle className="w-6 h-6 text-white mx-auto mb-2 drop-shadow-sm" />
              <div className="text-white font-medium text-sm drop-shadow-sm">Direto no WhatsApp</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/20">
              <Sparkles className="w-6 h-6 text-white mx-auto mb-2 drop-shadow-sm" />
              <div className="text-white font-medium text-sm drop-shadow-sm">Configuração instantânea</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="space-y-3">
            <Button 
              variant="whatsapp" 
              size="lg"
              className="text-lg px-12 group shadow-glow bg-white text-primary hover:bg-white/90"
              onClick={() => window.open('https://wa.me/5511999999999?text=Oi! Quero começar a usar o controla.ai', '_blank')}
            >
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Começar no WhatsApp agora
            </Button>
            
            <p className="text-white/90 text-sm drop-shadow-sm">
              Comece grátis por 7 dias • Sem cartão de crédito • Sem compromisso
            </p>
          </div>
          
          {/* Trust indicators */}
            <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
              <span className="drop-shadow-sm">Dados criptografados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
              <span className="drop-shadow-sm">Privacidade garantida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
              <span className="drop-shadow-sm">Suporte brasileiro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
