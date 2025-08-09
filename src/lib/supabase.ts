// Legacy client for backward compatibility
// Use @/utils/supabase/client or @/utils/supabase/server instead
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Type helper for Supabase client
export type SupabaseClient = typeof supabase
