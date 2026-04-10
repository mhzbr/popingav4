const SUPABASE_URL = "https://xdawzzbwpeghahksyyqb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYXd6emJ3cGVnaGFoa3N5eXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NzQ5NzgsImV4cCI6MjA5MTM1MDk3OH0.sjAw3qlfp72T0lw6eAos96rcQY-Up8Bg33pj06NpfNY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
  initAdminPanel();
});

function initAdminPanel() {
  const form = document.getElementById("productAdminForm");
  if (!form) return;

  const categoryMap = {
    anime: {
      name: "Anime",
      subcategories: [
        "Attack on Titan", "Black Clover", "Bleach", "Bob Esponja", "Boruto",
        "Chainsaw Man", "DC Comics", "Demon Slayer", "Dragon Ball",
        "Fullmetal Alchemist", "Hello Kitty", "Hunter x Hunter", "IT",
        "Jujutsu Kaisen", "Looney Tunes", "Mobile Suit", "My Hero",
        "Naruto", "One Piece", "Pokémon", "The Seven Deadly Sins",
        "Tokyo Ghoul", "Tom e Jerry", "Yu-Gi-Oh", "Outros"
      ]
    },
    dc: {
      name: "DC",
      subcategories: ["Arlequina", "Batman", "Coringa", "Flash", "Mulher Maravilha", "Superman", "Outros"]
    },
    disney: {
      name: "Disney",
      subcategories: [
        "A Bela e a Fera", "Aladdin", "Alice", "Branca de Neve", "Frozen",
        "Lilo e Stitch", "Mickey", "Moana", "O Estranho Mundo de Jack",
        "Os Incríveis", "Pequena Sereia", "Rei Leão", "Toy Story", "Tron"
      ]
    },
    esportes: {
      name: "Esportes",
      subcategories: ["Futebol", "Basquete", "UFC", "WWE", "NFL", "MLB", "Outros"]
    },
    filmes: {
      name: "Filmes",
      subcategories: [
        "007 - James Bond", "A Casa dos 1000 Corpos", "A Noiva Cadáver",
        "Como Treinar seu Dragão", "DC Comics", "Em Busca do Vale Encantado",
        "Godzilla", "Hellboy", "IT", "Jurassic Park", "Mad Max", "Marvel",
        "Minions", "O Senhor dos Anéis", "Os Caça-Fantasmas", "Predador",
        "Star Trek", "Outros"
      ]
    },
    games: {
      name: "Games",
      subcategories: [
        "Apex Legends", "Borderlands", "Crash Bandicoot", "Cuphead", "Diablo",
        "FNAF", "Fortnite", "Gears of War", "Kingdom Hearts",
        "League of Legends", "Marvel", "Mortal Kombat", "Overwatch",
        "Pokémon", "Sonic", "Street Fighter", "World of Warcraft", "Outros"
      ]
    },
    "harry-potter": {
      name: "Harry Potter",
      subcategories: ["Dumbledore", "Fantásticos e Onde Habitam", "Gina", "Harry Potter", "Hermione", "Ron", "Outros"]
    },
    marvel: {
      name: "Marvel",
      subcategories: [
        "Venom", "X-Men", "Thor", "Pantera Negra", "Hulk",
        "Homem de Ferro", "Homem Aranha", "Deadpool", "Capitão América", "Capitã Marvel"
      ]
    },
    musica: {
      name: "Música",
      subcategories: ["Blink 182", "BTS", "Kiss", "Michael Jackson", "Queen", "Snoop Dogg", "Outros"]
    },
    outros: {
      name: "Outros",
      subcategories: ["Clássicos", "Retrô", "Variados", "Licenças Especiais", "Outros"]
    },
    series: {
      name: "Séries",
      subcategories: [
        "A Família Addams", "Arrow", "Doctor Who", "Friends", "Game of Thrones",
        "House of the Dragon", "Lost", "Marvel", "Os Simpsons", "Peanuts",
        "Outros", "Power Ranger", "Rick and Morty", "South Park",
        "Stranger Things", "Ted Lasso", "The Big Bang Theory", "The Flash",
        "The Office", "The Walking Dead", "Wandinha"
      ]
    },
    "star-wars": {
      name: "Star Wars",
      subcategories: ["Chewbacca", "Darth Vader", "Han Solo", "Kylo Ren", "Luke Skywalker", "Princesa Leia", "Yoda"]
    },
    exclusivos: {
      name: "Exclusivos",
      subcategories: ["Chase", "Glow", "Metallic", "Convention Exclusive", "Limited Edition", "Outros Exclusivos"]
    }
  };

  const adminId = document.getElementById("adminId");
  const adminName = document.getElementById("adminName");
  const adminCategorySlug = document.getElementById("adminCategorySlug");
  const adminCategoryName = document.getElementById("adminCategoryName");
  const adminSubcategory = document.getElementById("adminSubcategory");
  const adminPrice = document.getElementById("adminPrice");
  const adminImage = document.getElementById("adminImage");
  const adminImageFile = document.getElementById("adminImageFile");
  const adminDescription = document.getElementById("adminDescription");
  const adminFeatured = document.getElementById("adminFeatured");
  const adminSlug = document.getElementById("adminSlug");

  const previewImage = document.getElementById("adminPreviewImage");
  const previewCategory = document.getElementById("adminPreviewCategory");
  const previewName = document.getElementById("adminPreviewName");
  const previewPrice = document.getElementById("adminPreviewPrice");
  const previewDescription = document.getElementById("adminPreviewDescription");

  const currentJsonBox = document.getElementById("adminCurrentJson");
  const allJsonBox = document.getElementById("adminAllJson");
  const productsList = document.getElementById("adminProductsList");

  const generateBtn = document.getElementById("generateProductBtn");
  const addBtn = document.getElementById("addProductBtn");
  const clearBtn = document.getElementById("clearProductBtn");

  const copyCurrentBtn = document.getElementById("copyCurrentJsonBtn");
  const copyAllBtn = document.getElementById("copyAllJsonBtn");
  const downloadAllBtn = document.getElementById("downloadAllJsonBtn");
  const clearAllBtn = document.getElementById("clearAllProductsBtn");

  const footerCopyJson = document.getElementById("footerCopyJson");
  const footerDownloadJson = document.getElementById("footerDownloadJson");

  let currentProduct = null;
  let editingId = null;
  let productsCache = [];

  function slugify(text) {
    return String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "e")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function formatPriceBR(value) {
    const num = Number(value || 0);
    return num.toFixed(2).replace(".", ",");
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function autoFillCategoryName() {
    const slug = adminCategorySlug.value.trim();
    if (categoryMap[slug]) adminCategoryName.value = categoryMap[slug].name;
  }

  function autoFillSubcategory() {
    const slug = adminCategorySlug.value.trim();
    if (categoryMap[slug] && categoryMap[slug].subcategories.length) {
      adminSubcategory.value = categoryMap[slug].subcategories[0];
    }
  }

  function buildProductObject(options = {}) {
    const id = adminId.value.trim();
    const name = adminName.value.trim();
    const categorySlug = adminCategorySlug.value.trim();
    const categoryName = adminCategoryName.value.trim();
    const subcategory = adminSubcategory.value.trim();
    const price = Number(adminPrice.value || 0);
    const image = (options.imageUrl ?? adminImage.value).trim();
    const description = adminDescription.value.trim() || `${name} colecionável.`;
    const featured = adminFeatured.value === "true";

    if (!id || !name || !categorySlug || !categoryName || !subcategory || !price) {
      return null;
    }

    const slug = `${slugify(subcategory)}-${id}`;
    adminSlug.value = slug;

    return {
      nome: name,
      slug,
      categoria_slug: categorySlug,
      categoria_nome: categoryName,
      subcategoria: subcategory,
      preco: price,
      descricao: description,
      imagem_url: image,
      destaque: featured,
      ativo: true
    };
  }

  function updatePreview(product) {
    if (!product) return;

    previewImage.src = product.imagem_url || "assets/images/logo.png";
    previewImage.onerror = () => {
      previewImage.src = "assets/images/logo.png";
    };

    previewCategory.textContent = `${product.categoria_nome} • ${product.subcategoria}`;
    previewName.textContent = product.nome;
    previewPrice.textContent = `R$ ${formatPriceBR(product.preco)}`;
    previewDescription.textContent = product.descricao || "Sem descrição.";
  }

  function resetPreview() {
    previewImage.src = "assets/images/logo.png";
    previewCategory.textContent = "Categoria";
    previewName.textContent = "Nome do produto";
    previewPrice.textContent = "R$ 0,00";
    previewDescription.textContent = "Descrição do produto.";
  }

  function updateCurrentJson(product) {
    currentJsonBox.value = product ? JSON.stringify(product, null, 2) : "";
  }

  function updateAllJson() {
    allJsonBox.value = JSON.stringify(productsCache, null, 2);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert("Não foi possível copiar automaticamente.");
    }
  }

  function downloadJsonFile(filename, content) {
    const blob = new Blob([content], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function uploadImage(file, productSlug) {
    const ext = file.name.split(".").pop();
    const filePath = `${productSlug}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabaseClient
      .storage
      .from("products")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabaseClient.storage.from("products").getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function fetchProducts() {
    const { data, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Erro ao carregar produtos do banco.");
      return;
    }

    productsCache = data || [];
    updateAllJson();
    renderProductsList();
  }

  function renderProductsList() {
    if (!productsCache.length) {
      productsList.innerHTML = `<div class="admin-empty">Nenhum produto cadastrado ainda.</div>`;
      return;
    }

    productsList.innerHTML = productsCache.map((product) => `
      <div class="admin-product-row">
        <div class="admin-product-meta">
          <strong>${escapeHtml(product.nome)}</strong>
          <span>${escapeHtml(product.categoria_nome)} • ${escapeHtml(product.subcategoria)}</span>
          <span>R$ ${formatPriceBR(product.preco)} • slug: ${escapeHtml(product.slug)}</span>
        </div>

        <div class="admin-product-actions">
          <button type="button" class="admin-action-btn ghost" data-copy="${product.id}">Copiar</button>
          <button type="button" class="admin-action-btn neutral" data-edit="${product.id}">Editar</button>
          <button type="button" class="admin-action-btn ghost" data-remove="${product.id}">Remover</button>
        </div>
      </div>
    `).join("");

    productsList.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.copy;
        const product = productsCache.find((item) => item.id === id);
        if (product) await copyText(JSON.stringify(product, null, 2));
      });
    });

    productsList.querySelectorAll("[data-edit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.edit;
        const product = productsCache.find((item) => item.id === id);
        if (product) loadProductIntoForm(product);
      });
    });

    productsList.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.remove;
        if (!confirm("Deseja remover este produto?")) return;

        const { error } = await supabaseClient.from("products").delete().eq("id", id);

        if (error) {
          alert(`Erro ao remover produto: ${error.message}`);
          console.error(error);
          return;
        }

        await fetchProducts();
      });
    });
  }

  function loadProductIntoForm(product) {
    editingId = product.id;

    adminId.value = product.slug.split("-").slice(-1)[0] || "";
    adminName.value = product.nome || "";
    adminCategorySlug.value = product.categoria_slug || "";
    adminCategoryName.value = product.categoria_nome || "";
    adminSubcategory.value = product.subcategoria || "";
    adminPrice.value = product.preco || "";
    adminImage.value = product.imagem_url || "";
    adminDescription.value = product.descricao || "";
    adminFeatured.value = product.destaque ? "true" : "false";
    adminSlug.value = product.slug || "";

    currentProduct = product;
    updatePreview(product);
    updateCurrentJson(product);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearForm() {
    form.reset();
    editingId = null;
    currentProduct = null;
    adminSlug.value = "";
    adminImage.value = "";
    if (adminImageFile) adminImageFile.value = "";
    updateCurrentJson(null);
    resetPreview();
  }

  async function generateCurrentProduct() {
    const baseWithoutImage = buildProductObject({ imageUrl: adminImage.value.trim() || "" });
    if (!baseWithoutImage) {
      alert("Preencha todos os campos obrigatórios.");
      return null;
    }

    let imageUrl = adminImage.value.trim();
    const file = adminImageFile?.files?.[0];

    if (!imageUrl && !file) {
      alert("Selecione uma imagem do produto.");
      return null;
    }

    if (file) {
      try {
        imageUrl = await uploadImage(file, baseWithoutImage.slug);
        adminImage.value = imageUrl;
      } catch (error) {
        alert(`Erro ao enviar imagem: ${error.message}`);
        console.error(error);
        return null;
      }
    }

    const finalProduct = buildProductObject({ imageUrl });
    if (!finalProduct) {
      alert("Não foi possível montar o produto.");
      return null;
    }

    currentProduct = finalProduct;
    updatePreview(finalProduct);
    updateCurrentJson(finalProduct);
    return finalProduct;
  }

  function syncPreviewIfPossible() {
    const partial = buildProductObject({ imageUrl: adminImage.value.trim() || "" });
    if (!partial) return;
    currentProduct = partial;
    updatePreview(partial);
    updateCurrentJson(partial);
  }

  generateBtn.addEventListener("click", async () => {
    await generateCurrentProduct();
  });

  addBtn.addEventListener("click", async () => {
    const product = await generateCurrentProduct();
    if (!product) return;

    let response;

    if (editingId) {
      response = await supabaseClient
        .from("products")
        .update(product)
        .eq("id", editingId)
        .select();
    } else {
      response = await supabaseClient
        .from("products")
        .insert(product)
        .select();
    }

    if (response.error) {
      alert(`Erro ao salvar produto: ${response.error.message}`);
      console.error(response.error);
      return;
    }

    alert(editingId ? "Produto atualizado com sucesso." : "Produto cadastrado com sucesso.");
    clearForm();
    await fetchProducts();
  });

  clearBtn.addEventListener("click", () => {
    clearForm();
  });

  copyCurrentBtn.addEventListener("click", async () => {
    if (!currentProduct) {
      alert("Gere um produto primeiro.");
      return;
    }
    await copyText(JSON.stringify(currentProduct, null, 2));
  });

  copyAllBtn.addEventListener("click", async () => {
    await copyText(JSON.stringify(productsCache, null, 2));
  });

  downloadAllBtn.addEventListener("click", () => {
    downloadJsonFile("products.json", JSON.stringify(productsCache, null, 2));
  });

  clearAllBtn.addEventListener("click", async () => {
    if (!confirm("Deseja remover todos os produtos?")) return;

    const { error } = await supabaseClient
      .from("products")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      alert(`Erro ao limpar produtos: ${error.message}`);
      console.error(error);
      return;
    }

    await fetchProducts();
  });

  if (footerCopyJson) {
    footerCopyJson.addEventListener("click", async (e) => {
      e.preventDefault();
      await copyText(JSON.stringify(productsCache, null, 2));
    });
  }

  if (footerDownloadJson) {
    footerDownloadJson.addEventListener("click", (e) => {
      e.preventDefault();
      downloadJsonFile("products.json", JSON.stringify(productsCache, null, 2));
    });
  }

  adminCategorySlug.addEventListener("change", () => {
    autoFillCategoryName();
    autoFillSubcategory();
    syncPreviewIfPossible();
  });

  [
    adminId,
    adminName,
    adminCategoryName,
    adminSubcategory,
    adminPrice,
    adminImage,
    adminDescription,
    adminFeatured
  ].forEach((field) => {
    field.addEventListener("input", () => {
      syncPreviewIfPossible();
    });
  });

  if (adminImageFile) {
    adminImageFile.addEventListener("change", () => {
      const file = adminImageFile.files?.[0];
      if (!file) return;
      const localPreview = URL.createObjectURL(file);
      previewImage.src = localPreview;
    });
  }

  fetchProducts();
  resetPreview();
}