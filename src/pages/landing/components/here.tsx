import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-primary/95" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/90 to-primary-light/80" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                🚀 Controle financeiro inteligente
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Seu controle financeiro no{" "}
              <span className="text-white drop-shadow-lg">
                WhatsApp
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed drop-shadow-md">
              Registre gastos por voz ou texto. Veja tudo em um painel simples.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="whatsapp" 
                size="lg"
                className="group bg-white text-primary hover:bg-white/90"
                onClick={() => window.open('https://wa.me/5511999999999?text=Oi! Quero começar a usar o controla.ai', '_blank')}
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Começar agora no WhatsApp
              </Button>
              
              <a href="#como-funciona">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/20 border-white/40 text-white hover:bg-white/30 backdrop-blur-sm font-semibold"
                >
                  Ver como funciona
                </Button>
              </a>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                <span className="text-sm font-medium drop-shadow-sm">Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                <span className="text-sm font-medium drop-shadow-sm">Sem planilhas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                <span className="text-sm font-medium drop-shadow-sm">Por voz</span>
              </div>
            </div>
          </div>
          
          {/* Mockup */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative bg-white rounded-3xl p-6 shadow-glow">
                <img 
                  // src={whatsappMockup} 
                  alt="Conversa no WhatsApp com controla.ai mostrando registro de gasto"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
