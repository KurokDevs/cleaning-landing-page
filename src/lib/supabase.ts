import { createClient } from '@supabase/supabase-js'

// Estas variables deben venir de tu proyecto en Supabase (Settings > API)
// Para que funcionen en Astro en el cliente (navegador), deben empezar con PUBLIC_
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ||
    'https://arhpucftgxpfoiqyeqqu.supabase.co'

const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaHB1Y2Z0Z3hwZm9pcXllcXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NTgzNTgsImV4cCI6MjA2OTEzNDM1OH0.yJ6c7K8G_vE_F7p2Jm9m6Q9s_W0o-F4y-V2f7w3s-Gg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
