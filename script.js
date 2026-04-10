(function () {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");

  function setTheme(mode) {
    if (mode === "light") {
      body.classList.add("light-mode");
      if (themeToggle) themeToggle.textContent = "☀️";
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-mode");
      if (themeToggle) themeToggle.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = body.classList.contains("light-mode");
      setTheme(isLight ? "dark" : "light");
    });
  }
})();

(function () {
  const track = document.getElementById("sliderTrack");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("sliderDots");

  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".slide"));
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll(".dot")) : [];
  let currentSlide = 0;
  let autoSlide = null;

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateSlider();
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (autoSlide) clearInterval(autoSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      startAutoSlide();
    });
  });

  updateSlider();
  startAutoSlide();
})();

(function () {
  const form = document.getElementById("funkoFinderForm");
  if (!form) return;

  const success = document.getElementById("finderSuccessMessage");
  const error = document.getElementById("finderErrorMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (success) success.style.display = "none";
    if (error) error.style.display = "none";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) throw new Error("Falha ao enviar");

      if (success) success.style.display = "block";
      form.reset();
    } catch (err) {
      if (error) error.style.display = "block";
      console.error(err);
    }
  });
})();

(function () {
  const busca = document.getElementById("busca");
  const grid = document.getElementById("grid-destaques");
  if (!busca || !grid || typeof getProducts !== "function") return;

  let cacheProdutos = [];

  function escaparHtml(texto) {
    return String(texto || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderizarProdutos(lista) {
    if (!lista.length) {
      grid.innerHTML = `
        <article class="product">
          <div class="product-body">
            <h3 class="product-title">Nenhum produto encontrado.</h3>
          </div>
        </article>
      `;
      return;
    }

    grid.innerHTML = lista
      .map((p) => {
        const nome = escaparHtml(p.nome);
        const categoria = escaparHtml(p.categoria_nome || "");
        const imagem = escaparHtml(p.imagem_url || "");
        const slug = escaparHtml(p.slug || "");

        return `
          <article class="product">
            <div class="product-image">
              <img src="${imagem}" alt="${nome}" loading="lazy" />
            </div>

            <div class="product-body">
              <div class="product-category">${categoria}</div>
              <h3 class="product-title">${nome}</h3>
              <div class="price">R$ ${formatPrice(p.preco)}</div>

              <div class="product-actions">
                <a href="produto.html?slug=${slug}" class="btn btn-view">Detalhes</a>
                <a
                  href="https://wa.me/5544991009184?text=${encodeURIComponent(`Olá, tenho interesse no ${p.nome}`)}"
                  target="_blank"
                  class="btn btn-buy"
                >
                  Comprar
                </a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  async function carregarProdutosHome() {
    try {
      const produtos = await getProducts();
      cacheProdutos = Array.isArray(produtos) ? produtos : [];
      renderizarProdutos(cacheProdutos.slice(0, 6));
    } catch (err) {
      console.error(err);
      renderizarProdutos([]);
    }
  }

  busca.addEventListener("input", () => {
    const termo = busca.value.trim().toLowerCase();

    if (!termo) {
      renderizarProdutos(cacheProdutos.slice(0, 6));
      return;
    }

    const filtrados = cacheProdutos.filter((p) =>
      String(p.nome || "").toLowerCase().includes(termo)
    );

    renderizarProdutos(filtrados);
  });

  carregarProdutosHome();
})();