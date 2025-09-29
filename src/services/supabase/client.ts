import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wknubmnklswskjmspoxj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbnVibW5rbHN3c2tqbXNwb3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjE3NDQsImV4cCI6MjA3MjgzNzc0NH0.rcgJhIAVkCDKeC-65lIjjYjY_yxmjfwGmAnREMwDZmU'

export function supabase() {
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