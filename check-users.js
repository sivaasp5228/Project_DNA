import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ankumwmjazmtfppyhqpl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFua3Vtd21qYXptdGZwcHlocXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NjY4NjMsImV4cCI6MjEwMDA0Mjg2M30.mlSaC5RzfrkE1j4cTamWebJKNL8yK7Svd4-BFAU8VwM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      console.log('--- USER PROFILES IN DATABASE ---');
      console.log(users);
      console.log(`Total count: ${users.length}`);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

run();
