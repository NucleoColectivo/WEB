
const products = [
  { name: "Mesa Concentradora Oro", cop: 3800000 },
  { name: "Mesa Circular EcoGeminy", cop: 4850000 },
  { name: "Trituradora Mandíbulas", cop: 5250000 },
  { name: "Concentrador JIG", cop: 4290000 },
  { name: "Análisis de Muestra", cop: 180000 },
  { name: "Asesoría Técnica en Campo", cop: 240000 }
];

function renderProducts() {
  const container = document.getElementById('product-list');
  products.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = "product-card";
    div.innerHTML = `
      <h4>${p.name}</h4>
      <p>COP $${p.cop.toLocaleString()}</p>
      <label>
        Cantidad: <input type="number" min="0" value="0" data-index="${i}" onchange="updateTotals()" />
      </label>
    `;
    container.appendChild(div);
  });
}

function updateTotals() {
  let totalCOP = 0;
  document.querySelectorAll('input[type="number"]').forEach(input => {
    const idx = parseInt(input.dataset.index);
    const qty = parseInt(input.value);
    if (qty > 0) {
      totalCOP += qty * products[idx].cop;
    }
  });
  document.getElementById("total-cop").textContent = totalCOP.toLocaleString();
}

function sendWhatsApp() {
  let msg = "Cotización Ferrominero:%0A";
  let totalCOP = 0;
  document.querySelectorAll('input[type="number"]').forEach(input => {
    const idx = parseInt(input.dataset.index);
    const qty = parseInt(input.value);
    const name = document.querySelectorAll('.product-card h4')[idx].textContent;
    if (qty > 0) {
      const cop = products[idx].cop;
      msg += `• ${name} x${qty} = $${(qty * cop).toLocaleString()} COP%0A`;
      totalCOP += qty * cop;
    }
  });
  msg += `%0ATotal: $${totalCOP.toLocaleString()} COP`;
  window.open(`https://wa.me/573137975967?text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener("DOMContentLoaded", renderProducts);
