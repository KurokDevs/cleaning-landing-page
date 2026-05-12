import { createClient } from '@supabase/supabase-js'

// Estas variables deben venir de tu proyecto en Supabase (Settings > API)
// Para que funcionen en Astro en el cliente (navegador), deben empezar con PUBLIC_
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://tu-proyecto.supabase.co'
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'tu-llave-anonima'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
