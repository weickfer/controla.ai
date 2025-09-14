import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export const Pricing = () => {
  const features = [
    "Registro por voz e texto via WhatsApp",
    "Dashboard completo com gráficos", 
    "Alertas automáticos e insights",
    "Backup seguro na nuvem",
    "Suporte direto pelo WhatsApp"
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Quero começar a usar o controla.ai', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plano único. Tudo incluído.
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center shadow-card bg-card/80 backdrop-blur-sm border-border/50">
            {/* Badge de confiança */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              +300 usuários no beta
            </div>

            {/* Preço */}
            <div className="mb-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                R$ 12,90
                <span className="text-lg text-muted-foreground font-normal">/mês</span>
              </div>
              <p className="text-muted-foreground">
                Sem surpresas. Cancele quando quiser.
              </p>
            </div>

            {/* Trial gratuito */}
            <div className="bg-accent/20 rounded-lg p-3 mb-6">
              <p className="text-sm text-accent-foreground font-medium">
                🎉 7 dias grátis no primeiro acesso
              </p>
            </div>

            {/* Lista de features */}
            <div className="space-y-4 mb-8 text-left">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-card-foreground text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              variant="whatsapp" 
              size="lg" 
              className="w-full"
              onClick={handleWhatsAppClick}
            >
              Quero começar agora
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
