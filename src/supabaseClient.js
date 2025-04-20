import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://juktvwdphjnqzyemkzaj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1a3R2d2RwaGpucXp5ZW1remFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzU3MDgsImV4cCI6MjA2MDY1MTcwOH0.2mpb7N11gELv64jGb831hepGvHb8vhYnshLQJJEVj4M"; // anon public key
export const supabase = createClient(supabaseUrl, supabaseKey);
