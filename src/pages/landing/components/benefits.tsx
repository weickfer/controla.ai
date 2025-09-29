import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Calendar, FileText, HelpCircle, MessageSquare, PieChart, ShieldCheck, Target } from "lucide-react";

export const Benefits = () => {
  const utilities = [
    {
      icon: MessageSquare,
      title: "Registro instantâneo",
      description: "Mande no WhatsApp: \"gastei 35 no mercado hoje\" e o agente registra na hora."
    },
    {
      icon: PieChart,
      title: "Dashboard claro",
      description: "Veja um gráfico simples mostrando quanto já foi em mercado, transporte e lazer."
    },
    {
      icon: Target,
      title: "Metas e alertas",
      description: "Defina limite de R$ 300 em delivery e receba aviso se chegar perto."
    },
    {
      icon: Calendar,
      title: "Despesas recorrentes",
      description: "Cadastre aluguel, contas fixas ou Netflix. O agente lança sozinho no dia certo."
    },
    {
      icon: FileText,
      title: "Resumo automático do mês",
      description: "Receba: \"Seu maior gasto foi com alimentação (R$ 842).\""
    },
    {
      icon: AlertTriangle,
      title: "Relatório da Vergonha",
      description: "Se exagerar em delivery ou Shein, receba um puxão de orelha bem-humorado: \"Delivery todo dia? Tá virando restaurante?\""
    },
    {
      icon: HelpCircle,
      title: "Pergunte o que quiser",
      description: "Ex.: \"Quanto gastei em mercado nos últimos 3 meses?\" O agente responde."
    },
    {
      icon: ShieldCheck,
      title: "Segurança e privacidade",
      description: "Acesso seguro com link pessoal. Seus dados são só seus."
    }
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Quero começar a usar o controla.ai', '_blank');
  };

  return (
    <section className="py-20 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Utilidades que resolvem o seu dia a dia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo o que você precisa para controlar seu dinheiro — direto no WhatsApp, sem planilhas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {utilities.map((utility, index) => {
            const IconComponent = utility.icon;
            return (
              <Card key={index} className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground mb-2">
                        {utility.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {utility.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            variant="whatsapp" 
            size="xl"
            onClick={handleWhatsAppClick}
            className="font-semibold"
          >
            Começar agora no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};