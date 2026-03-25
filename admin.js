const API_URL = "https://script.google.com/macros/s/AKfycbxJXtIe13oMf4bOC1bV6OQO_pSANeEgn7GY4WeipQuuo6Rd_TrZmT-3dI5pw966KGCK/exec";

let orders = [];
let filteredOrders = [];

async function loadOrders() {
  const tableBody = document.getElementById("ordersTableBody");
  tableBody.innerHTML = `<tr><td colspan="10" class="loading-cell">Carregando pedidos...</td></tr>`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    orders = data.orders || [];
    filteredOrders = [...orders];

    updateStats();
    renderTable();
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="10" class="loading-cell">Erro ao carregar pedidos.</td></tr>`;
    console.error(error);
  }
}

function updateStats() {
  document.getElementById("statTotal").textContent = orders.length;
  document.getElementById("statNovo").textContent = orders.filter(o => (o.status || "NOVO") === "NOVO").length;
  document.getElementById("statBuscando").textContent = orders.filter(o => o.status === "BUSCANDO").length;
  document.getElementById("statRespondido").textContent = orders.filter(o => o.status === "RESPONDIDO").length;
}

function renderTable() {
  const tableBody = document.getElementById("ordersTableBody");

  if (!filteredOrders.length) {
    tableBody.innerHTML = `<tr><td colspan="10" class="loading-cell">Nenhum pedido encontrado.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filteredOrders.map((order, index) => {
    const status = order.status || "NOVO";
    const phone = normalizePhone(order.whatsapp || "");
    const whatsappMessage = encodeURIComponent(
`Olá, ${order.nome || ""}! Aqui é da POP INGÁ.

Sobre o pedido do Funko:
- Funko: ${order.funko_nome || "-"}
- Modelo: ${order.modelo || "-"}
- SKU: ${order.sku || "-"}
- Categoria: ${order.categoria || "-"}

Estamos retornando seu atendimento.`
    );

    return `
      <tr>
        <td>${escapeHtml(order.data || "-")}</td>
        <td>${escapeHtml(order.nome || "-")}</td>
        <td>${escapeHtml(order.whatsapp || "-")}</td>
        <td>${escapeHtml(order.funko_nome || "-")}</td>
        <td>${escapeHtml(order.modelo || "-")}</td>
        <td>${escapeHtml(order.sku || "-")}</td>
        <td>${escapeHtml(order.categoria || "-")}</td>
        <td class="notes-cell">${escapeHtml(order.observacoes || "-")}</td>
        <td>
          <span class="status-badge status-${status}">${status}</span>
        </td>
        <td>
          <div class="action-group">
            <a class="action-btn" target="_blank" href="https://wa.me/${phone}?text=${whatsappMessage}">
              Abrir WhatsApp
            </a>

            <select class="status-select" onchange="updateStatus('${escapeJs(order.id)}', this.value)">
              <option value="NOVO" ${status === "NOVO" ? "selected" : ""}>NOVO</option>
              <option value="BUSCANDO" ${status === "BUSCANDO" ? "selected" : ""}>BUSCANDO</option>
              <option value="ENCONTRADO" ${status === "ENCONTRADO" ? "selected" : ""}>ENCONTRADO</option>
              <option value="RESPONDIDO" ${status === "RESPONDIDO" ? "selected" : ""}>RESPONDIDO</option>
            </select>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function normalizePhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("55")) return digits;
  return `55${digits}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeJs(value) {
  return String(value).replaceAll("'", "\\'");
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase().trim();
  const category = document.getElementById("categoryFilter").value;
  const status = document.getElementById("statusFilter").value;

  filteredOrders = orders.filter(order => {
    const matchesSearch =
      !search ||
      (order.nome || "").toLowerCase().includes(search) ||
      (order.funko_nome || "").toLowerCase().includes(search) ||
      (order.sku || "").toLowerCase().includes(search) ||
      (order.modelo || "").toLowerCase().includes(search);

    const matchesCategory = !category || (order.categoria || "") === category;
    const matchesStatus = !status || (order.status || "NOVO") === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  renderTable();
}

async function updateStatus(orderId, newStatus) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateStatus",
        id: orderId,
        status: newStatus
      })
    });

    const order = orders.find(o => o.id === orderId);
    if (order) order.status = newStatus;

    updateStats();
    applyFilters();
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    alert("Não foi possível atualizar o status.");
  }
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("statusFilter").addEventListener("change", applyFilters);
document.getElementById("reloadBtn").addEventListener("click", loadOrders);

loadOrders();