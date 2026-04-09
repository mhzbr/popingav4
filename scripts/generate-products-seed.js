const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "products.json");
const OUTPUT_DIR = path.join(ROOT, "assets", "produtos");
const PRODUCT_DIR = path.join(OUTPUT_DIR, "produtos");

const CATEGORY_CONFIG = {
  anime: {
    label: "Anime",
    description: "Explore a coleção de Anime com personagens icônicos e colecionáveis marcantes.",
    subcategories: [
      "Attack on Titan",
      "Black Clover",
      "Bleach",
      "Bob Esponja",
      "Boruto",
      "Chainsaw Man",
      "DC Comics",
      "Demon Slayer",
      "Dragon Ball",
      "Fullmetal Alchemist",
      "Hello Kitty",
      "Hunter x Hunter",
      "IT",
      "Jujutsu Kaisen",
      "Looney Tunes",
      "Mobile Suit",
      "My Hero",
      "Naruto",
      "One Piece",
      "Pokémon",
      "The Seven Deadly Sins",
      "Tokyo Ghoul",
      "Tom e Jerry",
      "Yu-Gi-Oh",
      "Outros"
    ]
  },
  dc: {
    label: "DC",
    description: "Explore a coleção DC com heróis, vilões e personagens lendários.",
    subcategories: [
      "Arlequina",
      "Batman",
      "Coringa",
      "Flash",
      "Mulher Maravilha",
      "Superman",
      "Outros"
    ]
  },
  disney: {
    label: "Disney",
    description: "Explore a coleção Disney com personagens clássicos, princesas e universos mágicos.",
    subcategories: [
      "A Bela e a Fera",
      "Aladdin",
      "Alice",
      "Branca de Neve",
      "Frozen",
      "Lilo e Stitch",
      "Mickey",
      "Moana",
      "O Estranho Mundo de Jack",
      "Os Incríveis",
      "Pequena Sereia",
      "Rei Leão",
      "Toy Story",
      "Tron"
    ]
  },
  esportes: {
    label: "Esportes",
    description: "Explore a coleção de esportes com atletas, lendas e personagens do universo esportivo.",
    subcategories: [
      "Futebol",
      "Basquete",
      "UFC",
      "WWE",
      "NFL",
      "MLB",
      "Outros"
    ]
  },
  filmes: {
    label: "Filmes",
    description: "Explore a coleção de Filmes com personagens icônicos do cinema.",
    subcategories: [
      "007 - James Bond",
      "A Casa dos 1000 Corpos",
      "A Noiva Cadáver",
      "Como Treinar seu Dragão",
      "DC Comics",
      "Em Busca do Vale Encantado",
      "Godzilla",
      "Hellboy",
      "IT",
      "Jurassic Park",
      "Mad Max",
      "Marvel",
      "Minions",
      "O Senhor dos Anéis",
      "Os Caça-Fantasmas",
      "Predador",
      "Star Trek",
      "Outros"
    ]
  },
  games: {
    label: "Games",
    description: "Explore a coleção de Games com personagens de franquias lendárias.",
    subcategories: [
      "Apex Legends",
      "Borderlands",
      "Crash Bandicoot",
      "Cuphead",
      "Diablo",
      "FNAF",
      "Fortnite",
      "Gears of War",
      "Kingdom Hearts",
      "League of Legends",
      "Marvel",
      "Mortal Kombat",
      "Overwatch",
      "Pokémon",
      "Sonic",
      "Street Fighter",
      "World of Warcraft",
      "Outros"
    ]
  },
  "harry-potter": {
    label: "Harry Potter",
    description: "Explore a coleção do mundo bruxo com personagens clássicos de Harry Potter.",
    subcategories: [
      "Dumbledore",
      "Fantásticos e Onde Habitam",
      "Gina",
      "Harry Potter",
      "Hermione",
      "Ron",
      "Outros"
    ]
  },
  marvel: {
    label: "Marvel",
    description: "Explore a coleção Marvel com heróis, vilões e personagens inesquecíveis.",
    subcategories: [
      "Venom",
      "X-Men",
      "Thor",
      "Pantera Negra",
      "Hulk",
      "Homem de Ferro",
      "Homem Aranha",
      "Deadpool",
      "Capitão América",
      "Capitã Marvel"
    ]
  },
  musica: {
    label: "Música",
    description: "Explore a coleção de Música com artistas e ícones lendários.",
    subcategories: [
      "Blink 182",
      "BTS",
      "Kiss",
      "Michael Jackson",
      "Queen",
      "Snoop Dogg",
      "Outros"
    ]
  },
  outros: {
    label: "Outros",
    description: "Explore personagens variados, licenças especiais e categorias diversas.",
    subcategories: [
      "Clássicos",
      "Retrô",
      "Variados",
      "Licenças Especiais",
      "Outros"
    ]
  },
  series: {
    label: "Séries",
    description: "Explore a coleção de Séries com personagens das produções mais amadas.",
    subcategories: [
      "A Família Addams",
      "Arrow",
      "Doctor Who",
      "Friends",
      "Game of Thrones",
      "House of the Dragon",
      "Lost",
      "Marvel",
      "Os Simpsons",
      "Peanuts",
      "Outros",
      "Power Ranger",
      "Rick and Morty",
      "South Park",
      "Stranger Things",
      "Ted Lasso",
      "The Big Bang Theory",
      "The Flash",
      "The Office",
      "The Walking Dead",
      "Wandinha"
    ]
  },
  "star-wars": {
    label: "Star Wars",
    description: "Explore a galáxia de Star Wars com personagens clássicos e lendários.",
    subcategories: [
      "Chewbacca",
      "Darth Vader",
      "Han Solo",
      "Kylo Ren",
      "Luke Skywalker",
      "Princesa Leia",
      "Yoda"
    ]
  },
  exclusivos: {
    label: "Exclusivos",
    description: "Explore edições limitadas, chase, glow e peças especiais para colecionadores.",
    subcategories: [
      "Chase",
      "Glow",
      "Metallic",
      "Convention Exclusive",
      "Limited Edition",
      "Outros Exclusivos"
    ]
  }
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function formatPrice(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

function escapeJs(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
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
  if (!products.length) return `<div class="category-hero-empty">Nenhum produto nesta seção.</div>`;

  const selected = products.slice(0, Math.min(2, products.length));
  const wrapperClass = selected.length === 1 ? "category-hero-single" : "category-hero-double";

  return `
    <div class="${wrapperClass}">
      ${selected.map((product) => `
        <a href="${detailsPrefix}${product.slug}.html" class="category-hero-card">
          <img src="${imagePrefix}${product.image}" alt="${product.name}">
          <div class="category-hero-overlay">
            <h2>${product.name}</h2>
            <span class="category-hero-price">R$ ${formatPrice(product.price)}</span>
          </div>
        </a>
      `).join("")}
    </div>
  `;
}

function buildProductCards(products, imagePrefix, detailsPrefix) {
  return products.map((product) => `
    <article class="product">
      <div class="product-image">
        <img src="${imagePrefix}${product.image}" alt="${product.name}" />
      </div>

      <div class="product-body">
        <div class="product-category">${product.categoryName}</div>
        <h3 class="product-title">${product.name}</h3>
        <div class="price">R$ ${formatPrice(product.price)}</div>

        <div class="product-actions">
          <a href="${detailsPrefix}${product.slug}.html" class="btn btn-view">Detalhes</a>

          <a
            href="javascript:void(0)"
            class="btn btn-buy"
            onclick="addToCart({
              id:'${product.id}',
              name:'${escapeJs(product.name)}',
              price:${product.price},
              image:'${product.image}',
              category:'${escapeJs(product.categoryName + " • " + (product.subcategory || ""))}',
              url:'assets/produtos/produtos/${product.slug}.html'
            })"
          >
            Comprar
          </a>
        </div>
      </div>
    </article>
  `).join("\n");
}

function buildSubcategoryLinks(categorySlug, currentSubcategory, availableSubcategories, depthRootPrefix = "../../") {
  return availableSubcategories.map((sub) => {
    const subSlug = slugify(sub);
    const href = `${depthRootPrefix}assets/produtos/${categorySlug}/${subSlug}.html`;
    return `<a href="${href}"${sub === currentSubcategory ? ' class="active"' : ""}>${sub}</a>`;
  }).join("\n              ");
}

function buildCategoryPage(page) {
  const { slug, label, description, products } = page;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Funkos ${label} | POP INGÁ</title>
  <meta name="description" content="${description}" />
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
            <h2>${slug === "funkos" ? "Todos os Funkos" : `Funkos ${label}`}</h2>
            <p>${description}</p>
          </div>
        </div>

        <div class="finder-grid">
          <aside class="finder-text">
            <span class="finder-tag">Subcategorias</span>
            <h2>${label}</h2>
            <p>Navegue pelos principais grupos dessa categoria.</p>
            <div class="footer-column">
              ${(slug !== "funkos" ? (CATEGORY_CONFIG[slug]?.subcategories || []).map(sub => {
                const subSlug = slugify(sub);
                return `<a href="${slug}/${subSlug}.html">${sub}</a>`;
              }).join("\n              ") : "<a href='#'>Catálogo completo</a>")}
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
  <title>${subcategory} | ${categoryLabel} | POP INGÁ</title>
  <meta name="description" content="Explore a subcategoria ${subcategory} da coleção ${categoryLabel} da POP INGÁ." />
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
            <h2>${subcategory}</h2>
            <p>Subcategoria de ${categoryLabel}</p>
          </div>
        </div>

        <div class="finder-grid">
          <aside class="finder-text">
            <span class="finder-tag">Subcategorias</span>
            <h2>${categoryLabel}</h2>
            <p>Navegue entre os grupos desta categoria.</p>
            <div class="footer-column">
              ${buildSubcategoryLinks(categorySlug, subcategory, availableSubcategories, "../../../")}
            </div>
          </aside>

          <section class="finder-form-card">
            ${buildHeroCards(products, "../../../", "../produtos/")}

            <div class="section-head" style="margin-top:24px;">
              <div>
                <h2 style="font-size:22px;">Produtos</h2>
                <p>Itens disponíveis em ${subcategory}</p>
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
  const categoryLabel = product.categoryName || CATEGORY_CONFIG[product.categorySlug]?.label || product.categorySlug;
  const subSlug = slugify(product.subcategory || "outros");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${product.name} | POP INGÁ</title>
  <meta name="description" content="${product.description || product.name}" />
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
            <h2>${product.name}</h2>
            <p>${categoryLabel} • ${product.subcategory || "Sem subcategoria"}</p>
          </div>
        </div>

        <div class="finder-grid">
          <aside class="finder-text">
            <span class="finder-tag">Informações</span>
            <h2>${product.name}</h2>
            <p>${product.description || "Produto colecionável da POP INGÁ."}</p>
            <div class="footer-column">
              <a href="../${product.categorySlug}.html">Voltar para ${categoryLabel}</a>
              <a href="../${product.categorySlug}/${subSlug}.html">Ver subcategoria</a>
              <a href="../../../carrinho.html">Ir para o carrinho</a>
            </div>
          </aside>

          <section class="finder-form-card">
            <div class="category-hero-single">
              <div class="category-hero-card">
                <img src="../../../${product.image}" alt="${product.name}">
                <div class="category-hero-overlay">
                  <h2>${product.name}</h2>
                  <span class="category-hero-price">R$ ${formatPrice(product.price)}</span>
                </div>
              </div>
            </div>

            <div class="section-head" style="margin-top:24px;">
              <div>
                <h2 style="font-size:22px;">Detalhes</h2>
                <p>SKU: ${product.id}</p>
              </div>
            </div>

            <p style="color:var(--muted); line-height:1.8; margin-bottom:18px;">
              ${product.description || "Produto colecionável da POP INGÁ."}
            </p>

            <div class="product-actions">
              <a
                href="javascript:void(0)"
                class="btn btn-buy"
                onclick="addToCart({
                  id:'${product.id}',
                  name:'${escapeJs(product.name)}',
                  price:${product.price},
                  image:'${product.image}',
                  category:'${escapeJs(categoryLabel + " • " + (product.subcategory || ""))}',
                  url:'assets/produtos/produtos/${product.slug}.html'
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

  const products = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  const byCategory = {};
  const byCategoryAndSub = {};

  for (const product of products) {
    if (!byCategory[product.categorySlug]) byCategory[product.categorySlug] = [];
    byCategory[product.categorySlug].push(product);

    if (product.subcategory) {
      if (!byCategoryAndSub[product.categorySlug]) byCategoryAndSub[product.categorySlug] = {};
      if (!byCategoryAndSub[product.categorySlug][product.subcategory]) byCategoryAndSub[product.categorySlug][product.subcategory] = [];
      byCategoryAndSub[product.categorySlug][product.subcategory].push(product);
    }
  }

  const allPage = {
    slug: "funkos",
    label: "Todos",
    description: "Explore todo o catálogo da POP INGÁ em um só lugar.",
    products
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, "funkos.html"), buildCategoryPage(allPage), "utf8");
  console.log("✅ Gerado: assets/produtos/funkos.html");

  for (const [slug, config] of Object.entries(CATEGORY_CONFIG)) {
    const categoryProducts = byCategory[slug] || [];
    const categoryPage = {
      slug,
      label: config.label,
      description: config.description,
      products: categoryProducts
    };

    fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.html`), buildCategoryPage(categoryPage), "utf8");
    console.log(`✅ Gerado: assets/produtos/${slug}.html`);

    const categoryDir = path.join(OUTPUT_DIR, slug);
    ensureDir(categoryDir);

    const subcategoriesMap = byCategoryAndSub[slug] || {};
    const availableSubcategories = Object.keys(subcategoriesMap).sort((a, b) => a.localeCompare(b, "pt-BR"));

    for (const [subcategory, subProducts] of Object.entries(subcategoriesMap)) {
      const subSlug = slugify(subcategory);
      const html = buildSubcategoryPage({
        categorySlug: slug,
        categoryLabel: config.label,
        subcategory,
        products: subProducts,
        availableSubcategories
      });

      fs.writeFileSync(path.join(categoryDir, `${subSlug}.html`), html, "utf8");
      console.log(`✅ Gerado: assets/produtos/${slug}/${subSlug}.html`);
    }
  }

  for (const product of products) {
    fs.writeFileSync(path.join(PRODUCT_DIR, `${product.slug}.html`), buildProductPage(product), "utf8");
    console.log(`✅ Gerado: assets/produtos/produtos/${product.slug}.html`);
  }

  console.log("\nTudo gerado com sucesso.");
}

main();