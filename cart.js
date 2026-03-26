const CART_KEY = "popinga_cart";

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function formatPrice(value) {
  return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}

function addToCart(product) {
  if (!product || !product.id) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name || "Produto",
      price: Number(product.price) || 0,
      image: product.image || "",
      category: product.category || "",
      url: product.url || "#",
      qty: 1
    });
  }

  saveCart();
  showCartFeedback(`${product.name || "Produto"} adicionado ao carrinho`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function updateItemQty(id, change) {
  const item = cart.find(product => product.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function getCartCount() {
  return cart.reduce((total, item) => total + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const finalTotalElement = document.getElementById("cart-total-final");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Seu carrinho está vazio</h3>
        <p>Adicione seus Funkos favoritos para montar o pedido.</p>
        <a href="assets/produtos/funkos.html" class="empty-cart-btn">
          Explorar coleção
        </a>
      </div>
    `;

    if (totalElement) totalElement.textContent = formatPrice(0);
    if (finalTotalElement) finalTotalElement.textContent = formatPrice(0);
    updateCartCount();
    return;
  }

  container.innerHTML = cart.map(item => {
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${escapeHtml(item.name)}">

        <div class="cart-item-info">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.category || "Colecionável")}</p>
          <strong>${formatPrice(item.price)}</strong>
        </div>

        <div class="cart-item-controls">
          <div class="qty-control">
            <button type="button" onclick="updateItemQty('${jsEscape(item.id)}', -1)">−</button>
            <span>${item.qty}</span>
            <button type="button" onclick="updateItemQty('${jsEscape(item.id)}', 1)">+</button>
          </div>

          <div class="cart-item-subtotal">
            ${formatPrice(item.price * item.qty)}
          </div>

          <div class="cart-item-actions-inline">
            <a href="${item.url || '#'}" class="cart-link-btn-secondary">Ver item</a>
            <button type="button" class="cart-remove-btn" onclick="removeFromCart('${jsEscape(item.id)}')">
              Remover
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const total = getCartTotal();
  if (totalElement) totalElement.textContent = formatPrice(total);
  if (finalTotalElement) finalTotalElement.textContent = formatPrice(total);

  updateCartCount();
}

function sendToWhats() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const phone = "5544991009184";

  let message = "Olá! Quero finalizar este pedido da POP INGÁ:%0A%0A";

  cart.forEach((item, index) => {
    message += `*${index + 1}. ${encodeURIComponent(item.name)}*%0A`;
    message += `Categoria: ${encodeURIComponent(item.category || "Colecionável")}%0A`;
    message += `Quantidade: ${item.qty}%0A`;
    message += `Valor unitário: ${encodeURIComponent(formatPrice(item.price))}%0A`;
    message += `Subtotal: ${encodeURIComponent(formatPrice(item.price * item.qty))}%0A`;
    if (item.url && item.url !== "#") {
      message += `Link: ${encodeURIComponent(item.url)}%0A`;
    }
    message += `%0A`;
  });

  message += `*Total do pedido:* ${encodeURIComponent(formatPrice(getCartTotal()))}%0A%0A`;
  message += `Pode me passar as próximas etapas?`;

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

function showCartFeedback(text) {
  const existingToast = document.querySelector(".cart-toast");

  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.textContent = text;

  Object.assign(toast.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    background: "#11151d",
    color: "#fff",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "12px",
    padding: "14px 16px",
    zIndex: "9999",
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
    fontSize: "14px"
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2200);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jsEscape(text) {
  return String(text).replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
});