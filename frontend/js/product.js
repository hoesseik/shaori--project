import { Cart } from "./cart.js";

document.getElementById("addToCart").addEventListener("click", () => {
  Cart.add({
    id: "shampoo-001",
    name: "Shaori Premium Shampoo",
    price: 24.95,
    image: "/images/shampoo.png"
  });

  alert("Toegevoegd aan winkelmand!");
});
