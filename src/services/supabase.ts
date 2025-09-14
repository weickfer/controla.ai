// supabaseClient.js (ou .ts)
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wknubmnklswskjmspoxj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbnVibW5rbHN3c2tqbXNwb3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjE3NDQsImV4cCI6MjA3MjgzNzc0NH0.rcgJhIAVkCDKeC-65lIjjYjY_yxmjfwGmAnREMwDZmU'

export function getSupabaseClientFromToken() {
  const token = localStorage.getItem('token') // Assumindo que você salva o JWT assim

  if (!token) {
    throw new Error('Token JWT não encontrado no localStorage.')
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  return supabase
}

export type User = {
  id: string
  name: string
}

export type Transaction = {
  id: number
  user_id: number
  type: 'income' | 'expense' | 'investment'
  amount: number
  category: string | null
  description: string | null
  transaction_date: any // ISO date string, e.g. '2024-06-13'
  created_at: string // ISO timestamp string
}

type GetUserData = {
  error: string;
  data: null | {
    user: {
      id: string
      name: string
    }
    transactions: Transaction[]
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
    const supabase = getSupabaseClientFromToken();
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        transactions(*)
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
      }
    }
  } catch (err) {
    return {
      error: 'unexpected',
      data: null,
    }
  }
}

export async function deleteTransaction(id: number): Promise<{ error: string | null }>{
  try {
    const supabase = getSupabaseClientFromToken();
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: 'delete-failed' };
    }
    return { error: null };
  } catch (e) {
    return { error: 'unexpected' };
  }
}
