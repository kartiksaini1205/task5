document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortOption = document.getElementById("sortOption");
  let products = [];

  fetch(products.json)
    .then((res) => res.json())
    .then((data) => {
      products = data;
      renderProducts();
    });

  function renderProducts() {
    let filtered = [...products];
    if (categoryFilter.value !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter.value
      );
    }
    if (sortOption.value === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption.value === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    productList.innerHTML = "";
    filtered.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${product.image}" loading="lazy" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }

  window.addToCart = function (id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(id)) {
      cart.push(id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  categoryFilter.addEventListener("change", renderProducts);
  sortOption.addEventListener("change", renderProducts);
});