import { Cart } from "./cart.js";

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";

  Cart.items.forEach(item => {
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" />
        <h4>${item.name}</h4>
        <p>€${item.price}</p>
        <input type="number" value="${item.qty}" min="1" data-id="${item.id}" />
        <button data-remove="${item.id}">Verwijder</button>
      </div>
    `;
  });

  document.getElementById("cartTotal").innerText = Cart.total().toFixed(2);
}

renderCart();
