import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase credentials
const supabaseUrl = 'https://yjfcoxubfnwodpfjweng.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqZmNveHViZm53b2RwZmp3ZW5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQwNzAsImV4cCI6MjA5ODkyMDA3MH0.ljx8kXqOpWCleCssxhsQC1_hkFqPzWanbLPN5Wee89w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// CRUD Functions
export const addTransaction = async (transaction) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction])
    .select();
  
  if (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
  return data[0];
};

export const getTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('Error getting transactions:', error);
    return [];
  }
  return data;
};

export const deleteTransaction = async (id) => {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
  return id;
};