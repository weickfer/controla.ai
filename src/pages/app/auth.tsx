import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5561996661389?text=Quero%20minha%20URL%20autorizada";

export function AuthRequiredView({ authError='' }) {
  return (
  <div className="min-h-screen grid place-items-center p-6">
    <div className="max-w-md w-full bg-card border rounded-2xl p-6 shadow-sm text-center">
      <h2 className="text-xl font-semibold">Precisamos autorizar seu acesso</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Não foi possível validar seu token. Solicite sua URL autorizada para entrar novamente.
      </p>

      <div className="mt-6 flex justify-center">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="gap-2">
            <Phone className="w-4 h-4" />
            Pedir no WhatsApp
          </Button>
        </a>
      </div>

      {/* Diagnóstico opcional em dev */}
      {process.env.NODE_ENV !== "production" && authError && (
        <p className="text-[11px] text-muted-foreground mt-4">Código: {authError}</p>
      )}
    </div>
  </div>
)
};