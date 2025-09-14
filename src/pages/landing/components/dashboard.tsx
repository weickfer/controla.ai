// import dashboardMockup from "@/assets/dashboard-mockup.jpg";
import { Calendar, PieChart, TrendingUp } from "lucide-react";

export const Dashboard = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Dashboard completo e automático
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Veja seus gastos organizados em gráficos bonitos e relatórios que se atualizam automaticamente. 
              Sem precisar fazer nada manualmente.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Gastos por categoria
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Veja onde seu dinheiro está sendo gasto com gráficos de pizza interativos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-whatsapp rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Evolução mensal
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Acompanhe como seus gastos mudaram ao longo do tempo
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-glow rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">
                    Relatórios automáticos
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Receba resumos semanais e mensais sem fazer nada
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dashboard mockup */}
          <div className="order-1 lg:order-2">
            <div className="relative max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-6 bg-gradient-primary rounded-3xl blur-2xl opacity-20" />
              
              {/* Main container */}
              <div className="relative bg-white rounded-3xl p-6 shadow-glow">
                <img 
                  src="/dashboard.webp" 
                  alt="Dashboard do controla.ai mostrando gráficos de gastos por categoria e evolução temporal"
                  className="w-full h-auto rounded-2xl"
                />
                
                {/* Floating stats */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-elegant">
                  <div className="text-xs text-muted-foreground mb-1">Este mês</div>
                  <div className="text-lg font-bold text-primary">R$ 2.340</div>
                  <div className="text-xs text-whatsapp">↓ 12% vs mês anterior</div>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-whatsapp rounded-2xl p-4 shadow-elegant text-white">
                  <div className="text-xs opacity-80 mb-1">Categoria top</div>
                  <div className="text-sm font-bold">Alimentação</div>
                  <div className="text-xs opacity-80">R$ 890</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
