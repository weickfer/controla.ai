import { RecurringTransaction, Transaction } from "../supabase";
import { supabase } from "./client";

type GetUserData = {
  error: string;
  data: null | {
    user: {
      id: string
      name: string
    }
    transactions: Transaction[];
    recurring: RecurringTransaction[];
  }
}

export async function getUserData(): Promise<GetUserData> {
  try {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    // Se houver token na URL, salvar no localStorage
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
    }

    // Preferir o token da URL; se não houver, tentar o salvo
    const token = tokenFromUrl || localStorage.getItem("token");

    if (!token) {
      return {
        data: null,
        error: 'missing-token'
      }
    }

    // Decodificar o payload do JWT para obter o uid (sub)
    let uid: string | undefined;
    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      uid = payload?.sub;
    } catch (err) {
      return {
        data: null,
        error: 'invalid-token'
      };
    }

    if (!uid) {
      return {
        data: null,
        error: 'invalid-token'
      }
    }

    // Buscar usuário no Supabase
    const { data, error } = await supabase()
      .from("users")
      .select(`
        *,
        transactions(*),
        recurring_transactions(*)
      `)
      .eq("id", uid)
      .order('created_at', { referencedTable: 'transactions', ascending: false })
      .single();

      if (error || !data) {
        return {
          data: null,
          error: 'user-not-found'
        }
      }
    
      const user = {
        id: data.id,
        name: data.name,
      } 
    // Sucesso: preencher user e liberar a tela
    return {
      error: null,
      data: {
        user: user,
        transactions: data?.transactions,
        recurring: data?.recurring_transactions,
      }
    }
  } catch (err) {
    return {
      error: 'unexpected',
      data: null,
    }
  }
}