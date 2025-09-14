import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Freelancer",
    content: "Finalmente consegui organizar meus gastos! Só falo no WhatsApp e tudo fica registrado. Muito prático!",
    rating: 5,
    avatar: "MS"
  },
  {
    name: "João Santos",
    role: "Empresário",
    content: "O dashboard é incrível. Vejo exatamente onde estou gastando mais e consigo me planejar melhor.",
    rating: 5,
    avatar: "JS"
  },
  {
    name: "Ana Costa",
    role: "Estudante",
    content: "Adorei poder registrar por voz. Quando estou na rua, só gravo o áudio e pronto! Sem complicação.",
    rating: 5,
    avatar: "AC"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            O que nossos usuários dizem
          </h2>
          <p className="text-lg text-muted-foreground">
            Pessoas reais compartilhando suas experiências
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              {/* Chat bubble style */}
              <div className="relative bg-primary/5 rounded-2xl rounded-bl-sm p-6 shadow-card group-hover:shadow-elegant transition-all duration-300">
                {/* Quote content */}
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-primary italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
                
                {/* User info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-primary text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                
                {/* Bubble tail */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-primary/5 transform rotate-45" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="flex -space-x-2">
              {testimonials.map((_, index) => (
                <div key={index} className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                  {testimonials[index].avatar}
                </div>
              ))}
            </div>
            <span className="text-sm ml-2">+1.247 usuários satisfeitos</span>
          </div>
        </div>
      </div>
    </section>
  );
};