import { Check, Mic, PieChart, Smartphone, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Mic,
    title: "Registro por voz ou texto",
    description: "Fale naturalmente ou digite. O controla.ai entende tudo."
  },
  {
    icon: PieChart,
    title: "Dashboard visual automático",
    description: "Gráficos bonitos e relatórios que se atualizam sozinhos."
  },
  {
    icon: Smartphone,
    title: "Direto no WhatsApp",
    description: "Sem app novo. Use onde você já está conectado."
  },
  {
    icon: TrendingUp,
    title: "Alertas inteligentes",
    description: "Saiba quando está gastando demais ou pode economizar."
  },
  {
    icon: Check,
    title: "Zero planilhas complicadas",
    description: "Esqueça fórmulas e tabelas. Tudo fica simples e automático."
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Por que usar o controla.ai?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma nova forma de cuidar do seu dinheiro, sem complicação
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-whatsapp rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-primary">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-whatsapp/10 text-whatsapp px-6 py-3 rounded-full">
            <Check className="w-5 h-5" />
            <span className="font-medium">100% gratuito para começar</span>
          </div>
        </div>
      </div>
    </section>
  );
};