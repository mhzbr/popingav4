document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSlider();
  initFunkoFinderForm();
});

function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const themeKey = "popinga_theme";
  const savedTheme = localStorage.getItem(themeKey) || "dark";

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

  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    applyTheme(isLight ? "dark" : "light");
  });
}

function initSlider() {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (!track || !slides.length || !prevBtn || !nextBtn) return;

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

  function moveSlide(direction) {
    goToSlide(currentSlide + direction);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      moveSlide(1);
    }, 5000);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  prevBtn.addEventListener("click", () => {
    moveSlide(-1);
    startAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    moveSlide(1);
    startAutoSlide();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slide);
      goToSlide(index);
      startAutoSlide();
    });
  });

  updateSlider();
  startAutoSlide();
}

function initFunkoFinderForm() {
  const funkoFinderForm = document.getElementById("funkoFinderForm");
  const finderSuccessMessage = document.getElementById("finderSuccessMessage");
  const finderErrorMessage = document.getElementById("finderErrorMessage");

  if (!funkoFinderForm) return;

  funkoFinderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (finderSuccessMessage) finderSuccessMessage.style.display = "none";
    if (finderErrorMessage) finderErrorMessage.style.display = "none";

    const nome = document.getElementById("clienteNome")?.value.trim() || "";
    const whatsapp = document.getElementById("clienteWhatsapp")?.value.trim() || "";
    const funkoNome = document.getElementById("funkoNome")?.value.trim() || "";
    const modelo = document.getElementById("funkoModelo")?.value.trim() || "";
    const sku = document.getElementById("funkoSku")?.value.trim() || "";
    const categoria = document.getElementById("funkoCategoria")?.value.trim() || "";
    const observacoes = document.getElementById("funkoObs")?.value.trim() || "";

    const formData = new FormData(funkoFinderForm);
    const whatsappWindow = window.open("", "_blank");

    try {
      const response = await fetch(funkoFinderForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        const mensagem =
`Olá, POP INGÁ! Quero ajuda para encontrar um Funko:

Nome: ${nome}
WhatsApp: ${whatsapp}

Nome do Funko: ${funkoNome}
Modelo / Personagem: ${modelo || "-"}
SKU: ${sku || "-"}
Categoria: ${categoria}
Observações: ${observacoes || "-"}`;

        const whatsappUrl = `https://wa.me/5544991009184?text=${encodeURIComponent(mensagem)}`;

        if (whatsappWindow) {
          whatsappWindow.location.href = whatsappUrl;
        } else {
          window.open(whatsappUrl, "_blank");
        }

        funkoFinderForm.reset();

        if (finderSuccessMessage) {
          finderSuccessMessage.style.display = "block";
        }
      } else {
        if (whatsappWindow) whatsappWindow.close();
        if (finderErrorMessage) finderErrorMessage.style.display = "block";
      }
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      if (finderErrorMessage) finderErrorMessage.style.display = "block";
    }
  });
}