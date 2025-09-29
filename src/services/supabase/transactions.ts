import { supabase } from "./client";

export async function deleteTransaction(id: number): Promise<{ error: string | null }>{
  try {
    const { error } = await supabase()
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
