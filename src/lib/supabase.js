import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://tlcvbncuillxveowjglw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsY3ZibmN1aWxseHZlb3dqZ2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NTE1NTAsImV4cCI6MjA4NjAyNzU1MH0.zSz5a-7ceJMMmJp4LLK4gGYr73-zuE5wxrj3TKRoVB4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
