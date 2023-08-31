import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rdddwlvrkqpprdmhftju.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZGR3bHZya3FwcHJkbWhmdGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzOTk2ODcsImV4cCI6MjAwODk3NTY4N30.8W_877i5kwcQp2POVJNrSl82zPJ3Q3DBnHnfYyDhhEc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
