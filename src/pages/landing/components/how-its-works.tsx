import { BarChart3, Bell, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Registre por voz ou texto",
    description: "Envie uma mensagem simples: 'Gastei 50 reais no mercado' e pronto!",
    color: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Veja seus gastos organizados",
    description: "Acesse um dashboard completo com gráficos e relatórios automáticos.",
    color: "text-whatsapp"
  },
  {
    icon: Bell,
    title: "Receba alertas inteligentes",
    description: "Seja notificado sobre metas, limites e oportunidades de economia.",
    color: "text-primary-glow"
  }
];

export const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Como funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Três passos simples para ter controle total das suas finanças
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}
              
              <div className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl mb-6 mx-auto">
                  <step.icon className={`w-8 h-8 text-white`} />
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-primary/5 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-sm text-primary font-medium mb-2">Exemplo de comando:</p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-primary font-semibold">"Gastei 50 reais no mercado"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};