const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const OUTPUT_DIR = path.join(ROOT, "assets", "produtos");

const categories = [
  {
    slug: "marvel",
    title: "Marvel",
    tag: "Universo Marvel",
    description:
      "Explore a linha Marvel com heróis, vilões e personagens icônicos. Homem de Ferro, Homem-Aranha, Capitão América, Thor, Hulk, Deadpool e muito mais.",
    subcategories: [
      "Homem de Ferro",
      "Homem-Aranha",
      "Capitão América",
      "Thor",
      "Hulk",
      "Deadpool",
      "Pantera Negra",
      "X-Men",
      "Outros Marvel",
    ],
    products: [
      {
        id: "34567",
        name: "Funko Pop Marvel - Homem de Ferro",
        price: 199.9,
        image: "assets/images/funkos/marvel/homem-de-ferro/34567.jpeg",
        imagePage: "../images/funkos/marvel/homem-de-ferro/34567.jpeg",
        subcategory: "Homem de Ferro",
      },
      {
        id: "45601",
        name: "Funko Pop Marvel - Homem-Aranha",
        price: 189.9,
        image: "assets/images/funkos/marvel/homem-aranha/45601.jpeg",
        imagePage: "../images/funkos/marvel/homem-aranha/45601.jpeg",
        subcategory: "Homem-Aranha",
      },
      {
        id: "45602",
        name: "Funko Pop Marvel - Capitão América",
        price: 184.9,
        image: "assets/images/funkos/marvel/capitao-america/45602.jpeg",
        imagePage: "../images/funkos/marvel/capitao-america/45602.jpeg",
        subcategory: "Capitão América",
      },
    ],
  },
  {
    slug: "dc",
    title: "DC",
    tag: "Universo DC",
    description:
      "Explore a linha DC com heróis, vilões e personagens clássicos. Batman, Coringa, Arlequina, Flash, Superman, Mulher-Maravilha e muito mais.",
    subcategories: [
      "Batman",
      "Coringa",
      "Arlequina",
      "Flash",
      "Mulher-Maravilha",
      "Superman",
      "Outros DC",
    ],
    products: [
      {
        id: "12345",
        name: "Funko Pop Heroes - Batman",
        price: 179.9,
        image: "assets/images/funkos/dc/batman/12345.jpeg",
        imagePage: "../images/funkos/dc/batman/12345.jpeg",
        subcategory: "Batman",
      },
      {
        id: "23456",
        name: "Funko Pop Heroes - Coringa",
        price: 189.9,
        image: "assets/images/funkos/dc/coringa/23456.jpeg",
        imagePage: "../images/funkos/dc/coringa/23456.jpeg",
        subcategory: "Coringa",
      },
      {
        id: "72691",
        name: "Funko Pop Heroes - Harley Quinn",
        price: 189.9,
        image: "assets/images/funkos/dc/arlequina/72691.jpeg",
        imagePage: "../images/funkos/dc/arlequina/72691.jpeg",
        subcategory: "Arlequina",
      },
    ],
  },
  {
    slug: "anime",
    title: "Anime",
    tag: "Universo Anime",
    description:
      "Explore a linha Anime com personagens lendários e colecionáveis marcantes. Naruto, One Piece, Dragon Ball, Demon Slayer, Jujutsu Kaisen e muito mais.",
    subcategories: [
      "Naruto",
      "Dragon Ball",
      "One Piece",
      "Demon Slayer",
      "Jujutsu Kaisen",
      "Pokémon",
      "Outros Anime",
    ],
    products: [
      {
        id: "45678",
        name: "Funko Pop Animation - Naruto Uzumaki",
        price: 169.9,
        image: "assets/images/funkos/anime/naruto/45678.jpeg",
        imagePage: "../images/funkos/anime/naruto/45678.jpeg",
        subcategory: "Naruto",
      },
      {
        id: "45679",
        name: "Funko Pop Animation - Goku",
        price: 179.9,
        image: "assets/images/funkos/anime/dragon-ball/45679.jpeg",
        imagePage: "../images/funkos/anime/dragon-ball/45679.jpeg",
        subcategory: "Dragon Ball",
      },
      {
        id: "45680",
        name: "Funko Pop Animation - Luffy",
        price: 184.9,
        image: "assets/images/funkos/anime/one-piece/45680.jpeg",
        imagePage: "../images/funkos/anime/one-piece/45680.jpeg",
        subcategory: "One Piece",
      },
    ],
  },
  {
    slug: "series",
    title: "Séries",
    tag: "Universo das Séries",
    description:
      "Explore personagens icônicos das séries mais marcantes. Stranger Things, Friends, The Office, Wandinha, Game of Thrones e muito mais.",
    subcategories: [
      "Stranger Things",
      "Friends",
      "The Office",
      "Game of Thrones",
      "Wandinha",
      "Rick and Morty",
      "Outras Séries",
    ],
    products: [
      {
        id: "51001",
        name: "Funko Pop Television - Eleven",
        price: 184.9,
        image: "assets/images/funkos/series/stranger-things/51001.jpeg",
        imagePage: "../images/funkos/series/stranger-things/51001.jpeg",
        subcategory: "Stranger Things",
      },
      {
        id: "51002",
        name: "Funko Pop Television - Rachel Green",
        price: 179.9,
        image: "assets/images/funkos/series/friends/51002.jpeg",
        imagePage: "../images/funkos/series/friends/51002.jpeg",
        subcategory: "Friends",
      },
      {
        id: "51003",
        name: "Funko Pop Television - Michael Scott",
        price: 189.9,
        image: "assets/images/funkos/series/the-office/51003.jpeg",
        imagePage: "../images/funkos/series/the-office/51003.jpeg",
        subcategory: "The Office",
      },
    ],
  },
  {
    slug: "games",
    title: "Games",
    tag: "Universo Games",
    description:
      "Colecione personagens icônicos dos games. Sonic, Mario, Mortal Kombat, Fortnite, Pokémon e muito mais.",
    subcategories: [
      "Mario",
      "Sonic",
      "Fortnite",
      "Mortal Kombat",
      "League of Legends",
      "Overwatch",
      "Pokémon",
      "Outros Games",
    ],
    products: [
      {
        id: "61001",
        name: "Funko Pop Games - Mario",
        price: 179.9,
        image: "assets/images/funkos/games/mario/61001.jpeg",
        imagePage: "../images/funkos/games/mario/61001.jpeg",
        subcategory: "Mario",
      },
      {
        id: "61002",
        name: "Funko Pop Games - Sonic",
        price: 184.9,
        image: "assets/images/funkos/games/sonic/61002.jpeg",
        imagePage: "../images/funkos/games/sonic/61002.jpeg",
        subcategory: "Sonic",
      },
      {
        id: "61003",
        name: "Funko Pop Games - Scorpion",
        price: 194.9,
        image: "assets/images/funkos/games/mortal-kombat/61003.jpeg",
        imagePage: "../images/funkos/games/mortal-kombat/61003.jpeg",
        subcategory: "Mortal Kombat",
      },
    ],
  },
  {
    slug: "filmes",
    title: "Filmes",
    tag: "Universo dos Filmes",
    description:
      "Explore a coleção de Funkos inspirados em filmes marcantes e franquias lendárias.",
    subcategories: [
      "Senhor dos Anéis",
      "Jurassic Park",
      "Matrix",
      "Ghostbusters",
      "Outros Filmes",
    ],
    products: [
      {
        id: "70001",
        name: "Funko Gandalf",
        price: 199.9,
        image: "assets/images/funkos/filmes/senhor-dos-aneis/70001.jpeg",
        imagePage: "../images/funkos/filmes/senhor-dos-aneis/70001.jpeg",
        subcategory: "Senhor dos Anéis",
      },
      {
        id: "70002",
        name: "Funko T-Rex",
        price: 189.9,
        image: "assets/images/funkos/filmes/jurassic-park/70002.jpeg",
        imagePage: "../images/funkos/filmes/jurassic-park/70002.jpeg",
        subcategory: "Jurassic Park",
      },
    ],
  },
  {
    slug: "disney",
    title: "Disney",
    tag: "Universo Disney",
    description:
      "Mickey, Frozen, Toy Story, princesas e personagens que marcaram gerações.",
    subcategories: [
      "Mickey",
      "Frozen",
      "Toy Story",
      "Princesas Disney",
      "Outros Disney",
    ],
    products: [
      {
        id: "71001",
        name: "Funko Mickey",
        price: 159.9,
        image: "assets/images/funkos/disney/mickey/71001.jpeg",
        imagePage: "../images/funkos/disney/mickey/71001.jpeg",
        subcategory: "Mickey",
      },
      {
        id: "71002",
        name: "Funko Elsa",
        price: 169.9,
        image: "assets/images/funkos/disney/frozen/71002.jpeg",
        imagePage: "../images/funkos/disney/frozen/71002.jpeg",
        subcategory: "Frozen",
      },
    ],
  },
  {
    slug: "star-wars",
    title: "Star Wars",
    tag: "Galáxia Star Wars",
    description:
      "Colecione os personagens mais icônicos de Star Wars, do lado luminoso ao lado sombrio.",
    subcategories: [
      "Yoda",
      "Darth Vader",
      "Luke Skywalker",
      "Leia",
      "Outros Star Wars",
    ],
    products: [
      {
        id: "72001",
        name: "Funko Yoda",
        price: 199.9,
        image: "assets/images/funkos/star-wars/yoda/72001.jpeg",
        imagePage: "../images/funkos/star-wars/yoda/72001.jpeg",
        subcategory: "Yoda",
      },
      {
        id: "72002",
        name: "Funko Darth Vader",
        price: 189.9,
        image: "assets/images/funkos/star-wars/darth-vader/72002.jpeg",
        imagePage: "../images/funkos/star-wars/darth-vader/72002.jpeg",
        subcategory: "Darth Vader",
      },
    ],
  },
  {
    slug: "harry-potter",
    title: "Harry Potter",
    tag: "Mundo Bruxo",
    description:
      "Harry, Hermione, Rony, Dumbledore e outros personagens do universo Harry Potter.",
    subcategories: [
      "Harry Potter",
      "Hermione",
      "Rony",
      "Dumbledore",
      "Outros Harry Potter",
    ],
    products: [
      {
        id: "73001",
        name: "Funko Harry Potter",
        price: 189.9,
        image: "assets/images/funkos/harry-potter/harry/73001.jpeg",
        imagePage: "../images/funkos/harry-potter/harry/73001.jpeg",
        subcategory: "Harry Potter",
      },
      {
        id: "73002",
        name: "Funko Hermione",
        price: 184.9,
        image: "assets/images/funkos/harry-potter/hermione/73002.jpeg",
        imagePage: "../images/funkos/harry-potter/hermione/73002.jpeg",
        subcategory: "Hermione",
      },
    ],
  },
  {
    slug: "musica",
    title: "Música",
    tag: "Ícones da Música",
    description:
      "Colecione artistas lendários como Freddie Mercury, Michael Jackson e outros nomes icônicos.",
    subcategories: [
      "Freddie Mercury",
      "Michael Jackson",
      "BTS",
      "Queen",
      "Outros Música",
    ],
    products: [
      {
        id: "74001",
        name: "Funko Freddie Mercury",
        price: 199.9,
        image: "assets/images/funkos/musica/freddie-mercury/74001.jpeg",
        imagePage: "../images/funkos/musica/freddie-mercury/74001.jpeg",
        subcategory: "Freddie Mercury",
      },
      {
        id: "74002",
        name: "Funko Michael Jackson",
        price: 209.9,
        image: "assets/images/funkos/musica/michael-jackson/74002.jpeg",
        imagePage: "../images/funkos/musica/michael-jackson/74002.jpeg",
        subcategory: "Michael Jackson",
      },
    ],
  },
];

function formatPrice(value) {
  return value.toFixed(2).replace(".", ",");
}

function buildMenu(activeSlug) {
  const menuPages = [
    { slug: "anime", label: "Anime" },
    { slug: "dc", label: "DC" },
    { slug: "marvel", label: "Marvel" },
    { slug: "series", label: "Séries" },
    { slug: "filmes", label: "Filmes" },
    { slug: "games", label: "Games" },
    { slug: "star-wars", label: "Star Wars" },
    { slug: "harry-potter", label: "Harry Potter" },
    { slug: "musica", label: "Música" },
    { slug: "disney", label: "Disney" },
  ];

  return menuPages
    .map(
      (item) =>
        `<a href="${item.slug}.html"${item.slug === activeSlug ? ' class="active"' : ""}>${item.label}</a>`
    )
    .join("\n            ");
}

function buildSidebarLinks(items) {
  return items.map((item) => `<a href="#">${item}</a>`).join("\n            ");
}

function buildProductCards(categoryTitle, products) {
  return products
    .map(
      (product) => `
            <article class="catalog-card">
              <div class="catalog-card-image">
                <img src="${product.imagePage}" alt="${product.name}" />
              </div>
              <div class="catalog-card-body">
                <span class="catalog-card-category">${categoryTitle} • ${product.subcategory}</span>
                <h3>${product.name}</h3>
                <p class="catalog-card-sku">SKU: ${product.id}</p>
                <div class="catalog-card-price">R$ ${formatPrice(product.price)}</div>
                <div class="catalog-card-actions">
                  <a href="#" class="btn btn-view">Detalhes</a>
                  <a
                    href="javascript:void(0)"
                    class="btn btn-buy"
                    onclick="addToCart({
                      id:'${product.id}',
                      name:'${escapeJs(product.name)}',
                      price:${product.price},
                      image:'${product.image}',
                      category:'${escapeJs(categoryTitle + " • " + product.subcategory)}'
                    })"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            </article>`
    )
    .join("\n");
}

function escapeJs(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function buildHtml(category) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${category.title} | POP INGÁ</title>
  <meta
    name="description"
    content="${category.description}"
  />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="../../style.css" />
</head>
<body>

  <div class="topbar">
    <div class="container topbar-inner">
      <div class="topbar-list">
        <span>🚚 Envio para todo o Brasil</span>
        <span>🛡️ Produtos 100% originais</span>
        <span>💳 Pix e parcelamento</span>
      </div>
      <div class="topbar-list">
        <span>${category.tag}</span>
      </div>
    </div>
  </div>

  <header class="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="../../index.html" class="logo">
          <span class="logo-badge">P</span>
          <span>POP INGÁ</span>
        </a>

        <form class="searchbar" action="${category.slug}.html" method="get">
          <input type="text" name="busca" placeholder="Buscar Funko ${category.title}..." />
          <button class="search-btn" type="submit">🔎</button>
        </form>

        <div class="header-actions">
          <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Alternar tema">🌙</button>
          <a href="../../carrinho.html" class="icon-btn" aria-label="Carrinho">
            🛒
            <span class="cart-count">0</span>
          </a>
        </div>
      </div>

      <nav class="nav">
        <div class="nav-inner">
          <div class="menu">
            <a href="../../index.html">Home</a>
            ${buildMenu(category.slug)}
          </div>

          <a href="../../personalizados.html" class="menu-highlight">
            Funkos Personalizados
          </a>
        </div>
      </nav>
    </div>
  </header>

  <main class="catalog-page">
    <div class="container">

      <div class="breadcrumb">
        <a href="../../index.html">Home</a>
        <span>›</span>
        <span>${category.title}</span>
      </div>

      <section class="catalog-hero">
        <div class="catalog-hero-text">
          <span class="catalog-tag">${category.tag}</span>
          <h1>Funkos ${category.title}</h1>
          <p>${category.description}</p>
        </div>
      </section>

      <section class="catalog-toolbar">
        <div class="catalog-toolbar-left">
          <strong>Categoria ${category.title}</strong>
          <span>${category.subcategories.join(", ")}</span>
        </div>

        <div class="catalog-toolbar-right">
          <select class="catalog-select">
            <option>Ordenar por destaque</option>
            <option>Menor preço</option>
            <option>Maior preço</option>
            <option>Mais recentes</option>
            <option>Nome A-Z</option>
          </select>
        </div>
      </section>

      <section class="catalog-layout">

        <aside class="catalog-sidebar">
          <div class="catalog-sidebar-card">
            <h3>Subcategorias ${category.title}</h3>
            ${buildSidebarLinks(category.subcategories)}
          </div>

          <div class="catalog-sidebar-card">
            <h3>Destaques</h3>
            <a href="../../personalizados.html">Personalizados</a>
            <a href="../../carrinho.html">Carrinho</a>
          </div>
        </aside>

        <section class="catalog-products">
          <div class="catalog-grid">
${buildProductCards(category.title, category.products)}
          </div>
        </section>

      </section>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      POP INGÁ © 2026<br />
      Catálogo de Funkos e colecionáveis geek
    </div>
  </footer>

  <script src="../../cart.js"></script>
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
  </script>
</body>
</html>`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  ensureDir(OUTPUT_DIR);

  categories.forEach((category) => {
    const html = buildHtml(category);
    const filePath = path.join(OUTPUT_DIR, `${category.slug}.html`);
    fs.writeFileSync(filePath, html, "utf8");
    console.log(`✅ Gerado: assets/produtos/${category.slug}.html`);
  });

  console.log("\nTudo pronto.");
}

main();