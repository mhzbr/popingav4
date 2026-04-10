const SUPABASE_URL = "https://xdawzzbwpeghahksyyqb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYXd6emJ3cGVnaGFoa3N5eXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NzQ5NzgsImV4cCI6MjA5MTM1MDk3OH0.sjAw3qlfp72T0lw6eAos96rcQY-Up8Bg33pj06NpfNY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function getProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

function formatPrice(value){
  return Number(value).toLocaleString("pt-BR",{
    minimumFractionDigits:2
  })
}