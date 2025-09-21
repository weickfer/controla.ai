import { Loader2 } from "lucide-react";

export function LoadingView() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm text-muted-foreground">Carregando suas informações…</p>
      </div>
    </div>
  )
}