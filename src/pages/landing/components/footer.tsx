import { FileText, Instagram, Mail, MessageCircle, Shield, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-whatsapp rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">controla.ai</h3>
            </div>
            <p className="text-white/80 leading-relaxed max-w-md">
              O assistente financeiro inteligente que funciona no WhatsApp. 
              Registre gastos por voz, veja relatórios automáticos e mantenha suas finanças organizadas.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="/privacidade" className="hover:text-whatsapp transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos" className="hover:text-whatsapp transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="mailto:contato@controla.ai" className="hover:text-whatsapp transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contato@controla.ai
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511999999999" className="hover:text-whatsapp transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Suporte no WhatsApp
                </a>
              </li>
            </ul>
            
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://instagram.com/controla.ai" 
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-whatsapp transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com/controla_ai" 
                className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-whatsapp transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div>
              © 2024 controla.ai. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6">
              <span>Feito com ❤️ no Brasil</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-whatsapp rounded-full animate-pulse" />
                <span>Sistema online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};