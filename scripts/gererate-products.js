const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "products.json");
const OUTPUT_DIR = path.join(ROOT, "assets", "produtos", "produtos");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function formatPrice(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

function escapeJs(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function renderGallery(gallery, alt) {
  return gallery
    .map(
      (img) => `
              <button class="product-thumb" type="button" onclick="changeMainImage('${img}')">
                <img src="${img}" alt="${alt}">
              </button>`
    )
    .join("\n");
}

function renderFeatures(features) {
  return features
    .map((item) => `<li>${item}</li>`)
    .join("\n                ");
}

function buildHtml(product) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${product.name} | POP INGÁ</title>
  <meta name="description" content="${product.description}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../../style.css" />
</head>
<body>

  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="../../../index.html" class="logo">
          <span class="logo-badge">P</span>
          <span>POP INGÁ</span>
        </a>

        <form class="searchbar" action="../${product.categorySlug}.html" method="get">
          <input type="text" name="busca" placeholder="Buscar colecionável..." />
          <button class="search-btn" type="submit">🔎</button>
        </form>

        <div class="header-actions">
          <button class="icon-btn theme-toggle" id="themeToggle">🌙</button>
          <a href="../../../carrinho.html" class="icon-btn">
            🛒
            <span class="cart-count">0</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <main class="product-page">
    <div class="container">

      <div class="breadcrumb">
        <a href="../../../index.html">Home</a>
        <span>›</span>
        <a href="../${product.categorySlug}.html">${product.categoryName}</a>
        <span>›</span>
        <span>${product.name}</span>
      </div>

      <section class="product-detail">
        <div class="product-gallery">
          <div class="product-main-image">
            <img id="mainProductImage" src="${product.imagePage}" alt="${product.name}">
          </div>

          <div class="product-thumbs">
${renderGallery(product.gallery || [product.imagePage], product.name)}
          </div>
        </div>

        <div class="product-info">
          <span class="product-badge">${product.categoryName} • ${product.subcategory}</span>
          <h1>${product.name}</h1>
          <p class="product-sku">SKU: ${product.id}</p>
          <div class="product-price">R$ ${formatPrice(product.price)}</div>

          <p class="product-description">${product.description}</p>

          <ul class="product-features">
                ${renderFeatures(product.features || [])}
          </ul>

          <div class="product-actions-large">
            <button
              class="btn btn-buy large"
              onclick="addToCart({
                id:'${product.id}',
                name:'${escapeJs(product.name)}',
                price:${product.price},
                image:'${product.image}',
                category:'${escapeJs(product.categoryName + " • " + product.subcategory)}',
                url:'assets/produtos/produtos/${product.slug}.html'
              })"
            >
              Adicionar ao carrinho
            </button>

            <a
              href="https://wa.me/5544991009184?text=${encodeURIComponent(
                `Olá! Tenho interesse no produto ${product.name} (SKU ${product.id}).`
              )}"
              target="_blank"
              class="btn btn-view large"
            >
              Comprar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  </main>

  <script src="../../../cart.js"></script>
  <script>
    const themeKey = "popinga_theme";
    const themeToggle = document.getElementById("themeToggle");

    function applyTheme(theme) {
      if (theme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
      } else {
        document.body.classList.remove("light-mode");
        themeToggle.textContent = "🌙";
      }
      localStorage.setItem(themeKey, theme);
    }

    const savedTheme = localStorage.getItem(themeKey) || "dark";
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      applyTheme(isLight ? "dark" : "light");
    });

    function changeMainImage(src) {
      const main = document.getElementById("mainProductImage");
      if (main) main.src = src;
    }
  </script>
</body>
</html>`;
}

function main() {
  ensureDir(OUTPUT_DIR);

  const products = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  products.forEach((product) => {
    const html = buildHtml(product);
    const filePath = path.join(OUTPUT_DIR, `${product.slug}.html`);
    fs.writeFileSync(filePath, html, "utf8");
    console.log(`✅ Gerado: assets/produtos/produtos/${product.slug}.html`);
  });

  console.log("\nPáginas de produto geradas com sucesso.");
}

main();