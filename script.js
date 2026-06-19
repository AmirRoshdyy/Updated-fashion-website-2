// Product Data - Updated with new items, correct images, and EGP prices
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 250,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Gray Hoodie",
    price: 400,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Blue Denim Jeans",
    price: 500, // Updated price for existing jeans
    image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=500", // Single blue jeans image
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 4,
    name: "Black Leather Jacket", // Changed to black
    price: 700,
    image: "https://images.unsplash.com/photo-1559501536-1c39d735e5a2?w=500", // Black jacket image
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "White Nike Sneakers",
    price: 800,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500", // White Nike image
    sizes: ["40", "41", "42", "43", "44"]
  },
  {
    id: 6,
    name: "Summer Dress",
    price: 500,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    sizes: ["XS", "S", "M", "L"]
  },
  // NEW ITEMS
  {
    id: 7,
    name: "Black Sweater",
    price: 400,
    image: "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=500",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 8,
    name: "Black Evening Dress (Soirée)",
    price: 900,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=500",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 9,
    name: "Black Leather Shoes",
    price: 600,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500",
    sizes: ["40", "41", "42", "43", "44"]
  },
  {
    id: 10,
    name: "Premium Blue Jeans",
    price: 500,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    sizes: ["28", "30", "32", "34", "36"]
  }
];

// Display products
function displayProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;
  
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">${product.price} EGP</p>
      <select id="size-${product.id}">
        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
      </select>
      <br />
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');
}

// Cart functions
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const sizeSelect = document.getElementById(`size-${productId}`);
  const size = sizeSelect ? sizeSelect.value : "M";
  
  const cart = getCart();
  cart.push({ ...product, selectedSize: size });
  saveCart(cart);
  
  alert(`${product.name} (Size: ${size}) added to cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    countEl.textContent = getCart().length;
  }
}

// Cart page display
function displayCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "";
    document.getElementById("checkout-btn-container").style.display = "none";
    document.getElementById("checkout-form-container").style.display = "none";
    return;
  }
  
  document.getElementById("checkout-btn-container").style.display = "block";
  
  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Size: ${item.selectedSize}</p>
        <p class="price">${item.price} EGP</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total").textContent = `Total: ${total} EGP`;
}

// Checkout Form Logic
function showCheckoutForm() {
  document.getElementById("checkout-form-container").style.display = "block";
  document.getElementById("checkout-btn-container").style.display = "none";
}

function toggleCardDetails() {
  const method = document.getElementById("payment-method").value;
  const cardDetails = document.getElementById("card-details");
  const cardInputs = cardDetails.querySelectorAll("input");
  
  if (method === "card") {
    cardDetails.style.display = "block";
    cardInputs.forEach(input => input.required = true);
  } else {
    cardDetails.style.display = "none";
    cardInputs.forEach(input => input.required = false);
  }
}

function processOrder(event) {
  event.preventDefault(); // Prevent page reload
  
  const gov = document.getElementById("governorate").value;
  const days = gov === "cairo" ? "2 days" : "3 to 5 days";
  
  const successMessage = document.getElementById("success-message");
  successMessage.textContent = `Purchase completed successfully. Your order will arrive within ${days}.`;
  
  document.getElementById("success-modal").style.display = "flex";
  
  localStorage.removeItem("cart");
  updateCartCount();
}

// Authentication (Login/Register) Logic
function openAuthModal() {
  document.getElementById("auth-modal").style.display = "flex";
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
}

function handleAuth(event) {
  event.preventDefault();
  const password = document.getElementById("auth-password").value;
  
  // Regex: 1 Lowercase, 1 Uppercase, 1 Number, 1 Special Char, Min 8 chars
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  if (!passwordRegex.test(password)) {
    alert("Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
    return;
  }
  
  alert("Account successfully authenticated!");
  closeAuthModal();
}

// Initialize
displayProducts();
updateCartCount();
displayCart();
