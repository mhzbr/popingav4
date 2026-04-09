const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "products.json");
const OUTPUT_DIR = path.join(ROOT, "assets", "produtos");
const PRODUCT_DIR = path.join(OUTPUT_DIR, "produtos");

const CATEGORY_CONFIG = {
  anime: {
    label: "Anime",
    description: "Explore a coleção de Anime com personagens icônicos e colecionáveis marcantes."
  },
  dc: {
    label: "DC",
    description: "Explore a coleção DC com heróis, vilões e personagens lendários."
  },
  disney: {
    label: "Disney",
    description: "Explore a coleção Disney com personagens clássicos, princesas e universos mágicos."
  },
  esportes: {
    label: "Esportes",
    description: "Explore a coleção de esportes com atletas, lendas e personagens do universo esportivo."
  },
  filmes: {
    label: "Filmes",
    description: "Explore a coleção de Filmes com personagens icônicos do cinema."
  },
  games: {
    label: "Games",
    description: "Explore a coleção de Games com personagens de franquias lendárias."
  },
  "harry-potter": {
    label: "Harry Potter",
    description: "Explore a coleção do mundo bruxo com personagens clássicos de Harry Potter."
  },
  marvel: {
    label: "Marvel",
    description: "Explore a coleção Marvel com heróis, vilões e personagens inesquecíveis."
  },
  musica: {
    label: "Música",
    description: "Explore a coleção de Música com artistas e ícones lendários."
  },
  outros: {
    label: "Outros",
    description: "Explore personagens variados, licenças especiais e categorias diversas."
  },
  series: {
    label: "Séries",
    description: "Explore a coleção de Séries com personagens das produções mais amadas."
  },
  "star-wars": {
    label: "Star Wars",
    description: "Explore a galáxia de Star Wars com personagens clássicos e lendários."
  },
  exclusivos: {
    label: "Exclusivos",
    description: "Explore edições limitadas, chase, glow e peças especiais para colecionadores."
  }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function formatPrice(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeJs(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

function slugify(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategoryLabel(slug) {
  return CATEGORY_CONFIG[slug]?.label || slug;
}

function getCategoryDescription(slug) {
  return CATEGORY_CONFIG[slug]?.description || `Explore a categoria ${getCategoryLabel(slug)} da POP INGÁ.`;
}

function buildTopbar() {
  return `
  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-list">
        <span>🚚 Envio para todo Brasil</span>
        <span>⭐ Produtos originais</span>
        <span>💳 Pix e parcelamento</span>
      </div>
    </div>
  </div>`;
}

function buildMenu(rootPrefix, activeCategorySlug = "") {
  const items = [
    { slug: "funkos", label: "Todos" },
    { slug: "anime", label: "Anime" },
    { slug: "dc", label: "DC" },
    { slug: "disney", label: "Disney" },
    { slug: "esportes", label: "Esportes" },
    { slug: "filmes", label: "Filmes" },
    { slug: "games", label: "Games" },
    { slug: "harry-potter", label: "Harry Potter" },
    { slug: "marvel", label: "Marvel" },
    { slug: "musica", label: "Música" },
    { slug: "outros", label: "Outros" },
    { slug: "series", label: "Séries" },
    { slug: "star-wars", label: "Star Wars" },
    { slug: "exclusivos", label: "Exclusivos" }
  ];

  return items.map((item) => {
    const href = `${rootPrefix}assets/produtos/${item.slug}.html`;
    return `<a href="${href}"${item.slug === activeCategorySlug ? ' class="active"' : ""}>${item.label}</a>`;
  }).join("\n            ");
}

function buildHeader(rootPrefix, searchAction, activeCategorySlug = "") {
  return `
  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="${rootPrefix}index.html" class="logo" aria-label="POP INGÁ">
          <img src="${rootPrefix}assets/images/logo.png" alt="POP INGÁ" class="logo-img" />
        </a>

        <form class="searchbar" action="${searchAction}" method="get">
          <input type="text" name="busca" placeholder="Buscar Funko..." />
          <button class="search-btn" type="submit" aria-label="Buscar">🔎</button>
        </form>

        <div class="header-actions">
          <button class="icon-btn" id="theme-toggle" type="button" aria-label="Alternar tema">🌙</button>
          <a href="${rootPrefix}carrinho.html" class="icon-btn" aria-label="Carrinho">
            🛒
            <span class="cart-count">0</span>
          </a>
        </div>
      </div>

      <nav class="nav">
        <div class="nav-inner">
          <div class="menu">
            <a href="${rootPrefix}index.html">Home</a>
            ${buildMenu(rootPrefix, activeCategorySlug)}
          </div>

          <a href="${rootPrefix}personalizados.html" class="nav-cta">
            ✨ Personalizados
          </a>
        </div>
      </nav>
    </div>
  </header>`;
}

function buildFooter(rootPrefix) {
  return `
  <footer class="site-footer site-footer-rich">
    <div class="container footer-rich-grid">
      <div class="footer-brand">
        <img src="${rootPrefix}assets/images/logo.png" alt="POP INGÁ" class="footer-logo" />
        <p>
          A POP INGÁ é sua loja de colecionáveis geek, com catálogo variado,
          atendimento próximo e projetos personalizados para quem quer algo único.
        </p>
      </div>

      <div class="footer-column">
        <h4>Navegação</h4>
        <a href="${rootPrefix}index.html">Home</a>
        <a href="${rootPrefix}assets/produtos/funkos.html">Todos os Funkos</a>
        <a href="${rootPrefix}personalizados.html">Personalizados</a>
        <a href="${rootPrefix}carrinho.html">Carrinho</a>
      </div>

      <div class="footer-column">
        <h4>Categorias</h4>
        <a href="${rootPrefix}assets/produtos/dc.html">DC</a>
        <a href="${rootPrefix}assets/produtos/marvel.html">Marvel</a>
        <a href="${rootPrefix}assets/produtos/anime.html">Anime</a>
        <a href="${rootPrefix}assets/produtos/games.html">Games</a>
      </div>

      <div class="footer-column">
        <h4>Contato</h4>
        <a href="https://wa.me/5544991009184" target="_blank">WhatsApp</a>
        <a href="${rootPrefix}personalizados.html">Projetos personalizados</a>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>POP INGÁ © 2026</span>
      <span>Colecionáveis Geek & Personalizados</span>
    </div>
  </footer>`;
}

function buildHeroCards(products, imagePrefix, detailsPrefix) {
  if (!products.length) {
    return `<div class="category-hero-empty">Nenhum produto nesta seção.</div>`;
  }

  const selected = products.slice(0, Math.min(2, products.length));
  const wrapperClass = selected.length === 1 ? "category-hero-single" : "category-hero-double";

  return `
    <div class="${wrapperClass}">
      ${selected.map((product) => `
        <a href="${detailsPrefix}${product.slug}.html" class="category-hero-card">
          <img src="${imagePrefix}${product.image}" alt="${escapeHtml(product.name)}">
          <div class="category-hero-overlay">
            <h2>${escapeHtml(product.name)}</h2>
            <span class="category-hero-price">R$ ${formatPrice(product.price)}</span>
          </div>
        </a>
      `).join("")}
    </div>
  `;
}

function buildProductCards(products, imagePrefix, detailsPrefix) {
  if (!products.length) {
    return `<div class="category-hero-empty">Nenhum produto encontrado.</div>`;
  }

  return products.map((product) => `
    <article class="product">
      <div class="product-image">
        <img src="${imagePrefix}${product.image}" alt="${escapeHtml(product.name)}" />
      </div>

      <div class="product-body">
        <div class="product-category">${escapeHtml(product.categoryName)}</div>
        <h3 class="product-title">${escapeHtml(product.name)}</h3>
        <div class="price">R$ ${formatPrice(product.price)}</div>

        <div class="product-actions">
          <a href="${detailsPrefix}${product.slug}.html" class="btn btn-view">Detalhes</a>

          <a
            href="javascript:void(0)"
            class="btn btn-buy"
            onclick="addToCart({
              id:'${escapeJs(product.id)}',
              name:'${escapeJs(product.name)}',
              price:${Number(product.price)},
              image:'${escapeJs(product.image)}',
              category:'${escapeJs((product.categoryName || "") + " • " + (product.subcategory || ""))}',
              url:'assets/produtos/produtos/${escapeJs(product.slug)}.html'
            })"
          >
            Comprar
          </a>
        </div>
      </div>
    </article>
  `).join("\n");
}

function buildCategorySidebarLinks(categorySlug, subcategories) {
  if (!subcategories.length) return `<a href="#">Sem subcategorias</a>`;

  return subcategories.map((sub) => {
    const subSlug = slugify(sub);
    return `<a href="${categorySlug}/${subSlug}.html">${escapeHtml(sub)}</a>`;
  }).join("\n              ");
}

function buildSubcategorySidebarLinks(categorySlug, currentSubcategory, subcategories, rootPrefix) {
  if (!subcategories.length) return `<a href="#">Sem subcategorias</a>`;

  return subcategories.map((sub) => {
    const subSlug = slugify(sub);
    return `<a href="${rootPrefix}assets/produtos/${categorySlug}/${subSlug}.html"${sub === currentSubcategory ? ' class="active"' : ""}>${escapeHtml(sub)}</a>`;
  }).join("\n              ");
}

function buildCategoryPage({ slug, label, description, products, subcategories }) {
  const title = slug === "funkos" ? "Todos os Funkos" : `Funkos ${label}`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | POP INGÁ</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../style.css" />
</head>
<body>
  ${buildTopbar()}
  ${buildHeader("../../", `${slug}.html`, slug)}

  <main>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(title)}</h2>
            <p>${escapeHtml(description)}</p>
          </div>
        </div>

        <div class="finder-grid">
          <aside class="finder-text">
            <span class="finder-tag">Subcategorias</span>
            <h2>${escapeHtml(label)}</h2>
            <p>Navegue pelos principais grupos dessa categoria.</p>
            <div class="footer-column">
              ${slug === "funkos" ? `<a href="#">Catálogo completo</a>` : buildCategorySidebarLinks(slug, subcategories)}
            </div>
          </aside>

          <section class="finder-form-card">
            ${buildHeroCards(products, "../../", "produtos/")}

            <div class="section-head" style="margin-top:24px;">
              <div>
                <h2 style="font-size:22px;">Mais produtos</h2>
                <p>Veja outros itens desta categoria</p>
              </div>
            </div>

            <div class="products-grid">
              ${buildProductCards(products, "../../", "produtos/")}
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>

  ${buildFooter("../../")}
  <script src="../../cart.js"></script>
  <script src="../../script.js"></script>
</body>
</html>`;
}

function buildSubcategoryPage({ categorySlug, categoryLabel, subcategory, products, availableSubcategories }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subcategory)} | ${escapeHtml(categoryLabel)} | POP INGÁ</title>
  <meta name="description" content="Explore a subcategoria ${escapeHtml(subcategory)} da coleção ${escapeHtml(categoryLabel)} da POP INGÁ." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../../style.css" />
</head>
<body>
  ${buildTopbar()}
  ${buildHeader("../../../", `../${categorySlug}.html`, categorySlug)}

  <main>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(subcategory)}</h2>
            <p>Subcategoria de ${escapeHtml(categoryLabel)}</p>
          </div>
        </div>

        <div class="finder-grid">
          <aside class="finder-text">
            <span class="finder-tag">Subcategorias</span>
            <h2>${escapeHtml(categoryLabel)}</h2>
            <p>Navegue entre os grupos desta categoria.</p>
            <div class="footer-column">
              ${buildSubcategorySidebarLinks(categorySlug, subcategory, availableSubcategories, "../../../")}
            </div>
          </aside>

          <section class="finder-form-card">
            ${buildHeroCards(products, "../../../", "../produtos/")}

            <div class="section-head" style="margin-top:24px;">
              <div>
                <h2 style="font-size:22px;">Produtos</h2>
                <p>Itens disponíveis em ${escapeHtml(subcategory)}</p>
              </div>
            </div>

            <div class="products-grid">
              ${buildProductCards(products, "../../../", "../produtos/")}
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>

  ${buildFooter("../../../")}
  <script src="../../../cart.js"></script>
  <script src="../../../script.js"></script>
</body>
</html>`;
}

function buildProductPage(product) {
  const categoryLabel = product.categoryName || getCategoryLabel(product.categorySlug);
  const subSlug = slugify(product.subcategory || "outros");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(product.name)} | POP INGÁ</title>
  <meta name="description" content="${escapeHtml(product.description || product.name)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../../style.css" />
</head>
<body>
  ${buildTopbar()}
  ${buildHeader("../../../", `../${product.categorySlug}.html`, product.categorySlug)}

  <main>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>${escapeHtml(product.name)}</h2>
            <p>${escapeHtml(categoryLabel)} • ${escapeHtml(product.subcategory || "Sem subcategoria")}</p>
          </div>
        </div>

        <div class="finder-grid">
          <aside class="finder-text">
            <span class="finder-tag">Informações</span>
            <h2>${escapeHtml(product.name)}</h2>
            <p>${escapeHtml(product.description || "Produto colecionável da POP INGÁ.")}</p>
            <div class="footer-column">
              <a href="../${product.categorySlug}.html">Voltar para ${escapeHtml(categoryLabel)}</a>
              <a href="../${product.categorySlug}/${subSlug}.html">Ver subcategoria</a>
              <a href="../../../carrinho.html">Ir para o carrinho</a>
            </div>
          </aside>

          <section class="finder-form-card">
            <div class="category-hero-single">
              <div class="category-hero-card">
                <img src="../../../${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
                <div class="category-hero-overlay">
                  <h2>${escapeHtml(product.name)}</h2>
                  <span class="category-hero-price">R$ ${formatPrice(product.price)}</span>
                </div>
              </div>
            </div>

            <div class="section-head" style="margin-top:24px;">
              <div>
                <h2 style="font-size:22px;">Detalhes</h2>
                <p>SKU: ${escapeHtml(product.id)}</p>
              </div>
            </div>

            <p style="color:var(--muted); line-height:1.8; margin-bottom:18px;">
              ${escapeHtml(product.description || "Produto colecionável da POP INGÁ.")}
            </p>

            <div class="product-actions">
              <a
                href="javascript:void(0)"
                class="btn btn-buy"
                onclick="addToCart({
                  id:'${escapeJs(product.id)}',
                  name:'${escapeJs(product.name)}',
                  price:${Number(product.price)},
                  image:'${escapeJs(product.image)}',
                  category:'${escapeJs(categoryLabel + " • " + (product.subcategory || ""))}',
                  url:'assets/produtos/produtos/${escapeJs(product.slug)}.html'
                })"
              >
                Adicionar ao carrinho
              </a>

              <a href="https://wa.me/5544991009184" target="_blank" class="btn btn-view">
                Comprar pelo WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>

  ${buildFooter("../../../")}
  <script src="../../../cart.js"></script>
  <script src="../../../script.js"></script>
</body>
</html>`;
}

function main() {
  ensureDir(OUTPUT_DIR);
  ensureDir(PRODUCT_DIR);

  if (!fs.existsSync(DATA_FILE)) {
    console.error("❌ Arquivo data/products.json não encontrado.");
    process.exit(1);
  }

  const products = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  const byCategory = {};
  const byCategoryAndSub = {};

  for (const product of products) {
    if (!product.categorySlug) continue;

    if (!byCategory[product.categorySlug]) {
      byCategory[product.categorySlug] = [];
    }
    byCategory[product.categorySlug].push(product);

    if (product.subcategory) {
      if (!byCategoryAndSub[product.categorySlug]) {
        byCategoryAndSub[product.categorySlug] = {};
      }
      if (!byCategoryAndSub[product.categorySlug][product.subcategory]) {
        byCategoryAndSub[product.categorySlug][product.subcategory] = [];
      }
      byCategoryAndSub[product.categorySlug][product.subcategory].push(product);
    }
  }

  const allProductsPage = {
    slug: "funkos",
    label: "Todos",
    description: "Explore todo o catálogo da POP INGÁ em um só lugar.",
    products,
    subcategories: []
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "funkos.html"),
    buildCategoryPage(allProductsPage),
    "utf8"
  );
  console.log("✅ Gerado: assets/produtos/funkos.html");

  for (const [categorySlug, config] of Object.entries(CATEGORY_CONFIG)) {
    const categoryProducts = byCategory[categorySlug] || [];
    const subcategoriesMap = byCategoryAndSub[categorySlug] || {};
    const availableSubcategories = Object.keys(subcategoriesMap).sort((a, b) => a.localeCompare(b, "pt-BR"));

    const categoryHtml = buildCategoryPage({
      slug: categorySlug,
      label: config.label,
      description: config.description,
      products: categoryProducts,
      subcategories: availableSubcategories
    });

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${categorySlug}.html`),
      categoryHtml,
      "utf8"
    );
    console.log(`✅ Gerado: assets/produtos/${categorySlug}.html`);

    const categoryDir = path.join(OUTPUT_DIR, categorySlug);
    ensureDir(categoryDir);

    for (const [subcategory, subProducts] of Object.entries(subcategoriesMap)) {
      const subSlug = slugify(subcategory);

      const subcategoryHtml = buildSubcategoryPage({
        categorySlug,
        categoryLabel: config.label,
        subcategory,
        products: subProducts,
        availableSubcategories
      });

      fs.writeFileSync(
        path.join(categoryDir, `${subSlug}.html`),
        subcategoryHtml,
        "utf8"
      );
      console.log(`✅ Gerado: assets/produtos/${categorySlug}/${subSlug}.html`);
    }
  }

  for (const product of products) {
    const productHtml = buildProductPage(product);

    fs.writeFileSync(
      path.join(PRODUCT_DIR, `${product.slug}.html`),
      productHtml,
      "utf8"
    );
    console.log(`✅ Gerado: assets/produtos/produtos/${product.slug}.html`);
  }

  console.log("\n✅ Tudo gerado com sucesso.");
}

main();