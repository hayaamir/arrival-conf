import { createClient } from "@supabase/supabase-js";

export default createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_ANON_KEY
);
