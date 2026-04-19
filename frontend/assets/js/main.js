// --- ALGEMENE WEBSITE LOGICA (main.js) ---

// 1. Jaartal in footer
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// 2. Navigatie highlight (Zorgt dat de juiste link rood wordt)
const currentPage = window.location.pathname.includes("product")
  ? "product"
  : "home";

document.querySelectorAll(".nav-link").forEach(link => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});

// 3. Mollie placeholder (Voor de toekomstige shop)
const orderButton = document.getElementById("orderButton");
if (orderButton) {
  orderButton.addEventListener("click", () => {
    alert("Shaori is bijna klaar voor bestellingen! De Mollie checkout wordt binnenkort geactiveerd.");
  });
}