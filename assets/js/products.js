const SUPABASE_URL = "https://xdawzzbwpeghahksyyqb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYXd6emJ3cGVnaGFoa3N5eXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NzQ5NzgsImV4cCI6MjA5MTM1MDk3OH0.sjAw3qlfp72T0lw6eAos96rcQY-Up8Bg33pj06NpfNY";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function formatPrice(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function normalizeProduct(p) {
  return {
    id: p.id,
    slug: p.slug,
    nome: p.nome,
    categoria_slug: p.categoria_slug,
    categoria_nome: p.categoria_nome,
    subcategoria: p.subcategoria,
    preco: Number(p.preco || 0),
    imagem_url: p.imagem_url,
    descricao: p.descricao || "",
    destaque: Boolean(p.destaque),
    ativo: Boolean(p.ativo),
    created_at: p.created_at || null
  };
}

function normalizeList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeProduct);
}

async function getProducts(options = {}) {
  let query = supabaseClient
    .from("products")
    .select("*");

  if (options.onlyActive !== false) {
    query = query.eq("ativo", true);
  }

  if (options.featured) {
    query = query.eq("destaque", true);
  }

  if (options.category) {
    query = query.eq("categoria_slug", options.category);
  }

  if (options.subcategory) {
    query = query.eq("subcategoria", options.subcategory);
  }

  if (options.search) {
    query = query.or(
      `
      nome.ilike.%${options.search}%,
      descricao.ilike.%${options.search}%,
      subcategoria.ilike.%${options.search}%
      `
    );
  }

  query = query.order("created_at", { ascending: false });

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao buscar produtos", error);
    return [];
  }

  return normalizeList(data);
}

async function getProductBySlug(slug) {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Produto não encontrado", error);
    return null;
  }

  return normalizeProduct(data);
}

async function getFeaturedProducts(limit = 6) {
  return getProducts({
    featured: true,
    limit
  });
}

async function getProductsByCategory(slug) {
  return getProducts({
    category: slug
  });
}

async function getProductsBySubcategory(category, subcategory) {
  return getProducts({
    category,
    subcategory
  });
}