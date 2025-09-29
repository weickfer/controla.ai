import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, MessageSquare } from "lucide-react";

export const ShameReport = () => {
  const benefits = [
    "Mostra onde você exagerou sem perceber",
    "Torna controle financeiro divertido e viciante", 
    "Te dá um choque de realidade que planilhas nunca dão"
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999?text=Quero receber meu puxão de orelha todo mês!', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Relatório da Vergonha
            </h2>
            <p className="text-lg text-muted-foreground">
              Seu extrato nunca falou tanto sobre você… e vai te dar um puxão de orelha.
            </p>
          </div>

          {/* WhatsApp Mockup */}
          <div className="mb-12">
            <Card className="max-w-md mx-auto bg-whatsapp/5 border-whatsapp/20 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-whatsapp rounded-full">
                    <MessageSquare className="h-4 w-4 text-whatsapp-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Controla.AI • agora
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-4 shadow-sm border-l-4 border-destructive">
                  <div className="text-sm font-semibold text-destructive mb-3">
                    *Relatório da Vergonha – Agosto*
                  </div>
                  <div className="space-y-2 text-sm text-foreground mb-4">
                    <div>- R$ 720 em <em>delivery</em> (virou sócio do iFood?)</div>
                    <div>- 4 compras na <em>Shein</em> (tá montando loja?)</div>
                    <div>- Gastos maiores que sua renda (se fosse empresa, já tinha falido)</div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Seu bolso tá gritando, mas ainda dá tempo de virar o jogo.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <div className="grid gap-4 max-w-2xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              variant="whatsapp" 
              size="xl"
              onClick={handleWhatsAppClick}
              className="font-semibold"
            >
              Quero receber meu puxão de orelha todo mês
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};