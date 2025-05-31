/**
 * ======================
 * Product Page Quantity
 * ======================
 * Handles +/- buttons in the product page
 */
document.addEventListener("DOMContentLoaded", function () {
  const quantityDisplay = document.getElementById("quantity-number");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");

  if (quantityDisplay && increaseBtn && decreaseBtn) {
    let quantity = 1;

    function updateButtons() {
      decreaseBtn.disabled = quantity <= 1;
      increaseBtn.disabled = quantity >= 10;
    }

    // Increase
    increaseBtn.addEventListener("click", () => {
      if (quantity < 10) {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateButtons();
      }
    });

    // Decrease
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
        updateButtons();
      }
    });

    updateButtons();
  }
});

/**
 * ============================
 * Add to Cart Functionality
 * ============================
 * Stores selected product data in localStorage and redirects to cart page
 */
document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.querySelector(".AddtoCart");
  const sizeSelect = document.getElementById("size-select");
  const quantityDisplay = document.getElementById("quantity-number");
  const productNameElement = document.getElementById("NAME");

  if (addToCartBtn && sizeSelect && quantityDisplay && productNameElement) {
    addToCartBtn.addEventListener("click", () => {
      const selectedSize = sizeSelect.value;
      const quantity = parseInt(quantityDisplay.textContent);
      const productName = productNameElement.textContent;

      if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }

      const itemKey = addToCartBtn.dataset.itemKey;

      // Save item data in localStorage
      localStorage.setItem(
        itemKey,
        JSON.stringify({
          name: productName,
          size: selectedSize,
          quantity: quantity,
        })
      );

      goToCart(); // Redirect to cart
    });
  }
});

/**
 * ==============================
 * Shopping Cart Initialization
 * ==============================
 * Loads cart items from localStorage and displays them
 */
document.addEventListener("DOMContentLoaded", function () {
  initializeCart();
});

function initializeCart() {
  const item1 = JSON.parse(localStorage.getItem("cart-item-1"));
  const item2 = JSON.parse(localStorage.getItem("cart-item-2"));

  const item1El = document.querySelector(".ITEM1");
  const item2El = document.querySelector(".ITEM2");

  // Setup ITEM1
  if (item1 && item1El) {
    item1El.style.display = "flex";
    item1El.querySelector("h3").textContent = item1.name;
    item1El.querySelector(
      ".item-info p:nth-of-type(2)"
    ).textContent = `Size: ${item1.size}`;
    item1El.querySelector(".qty-number").textContent = item1.quantity;
  } else if (item1El) {
    item1El.style.display = "none";
  }

  // Setup ITEM2
  if (item2 && item2El) {
    item2El.style.display = "flex";
    item2El.querySelector("h3").textContent = item2.name;
    item2El.querySelector(
      ".item-info p:nth-of-type(2)"
    ).textContent = `Size: ${item2.size}`;
    item2El.querySelector(".qty-number").textContent = item2.quantity;
  } else if (item2El) {
    item2El.style.display = "none";
  }

  // Trash icons
  const trash1 = document.querySelector(".trash-item1");
  const trash2 = document.querySelector(".trash-item2");

  // Delete ITEM1
  if (trash1) {
    trash1.addEventListener("click", function () {
      localStorage.removeItem("cart-item-1");
      if (item1El) item1El.style.display = "none";
      updateCartSummary();
    });
  }

  // Delete ITEM2
  if (trash2) {
    trash2.addEventListener("click", function () {
      localStorage.removeItem("cart-item-2");
      if (item2El) item2El.style.display = "none";
      updateCartSummary();
    });
  }

  updateCartSummary();
}

/**
 * ===================
 * Cart Summary Update
 * ===================
 * Updates total items, subtotal and checkout button state
 */
function updateCartSummary() {
  const item1 = JSON.parse(localStorage.getItem("cart-item-1"));
  const item2 = JSON.parse(localStorage.getItem("cart-item-2"));

  let itemCount = 0;
  let subtotal = 0;

  // Calculate totals
  if (item1) {
    itemCount += item1.quantity;
    subtotal += 649.95 * item1.quantity;
  }

  if (item2) {
    itemCount += item2.quantity;
    subtotal += 250.0 * item2.quantity;
  }

  // Update cart UI
  const itemCountEl = document.querySelector(".CartTopSection h2");
  const subtotalEl = document.querySelector(".cartFooter .price");

  if (itemCountEl) itemCountEl.textContent = `No. Items (${itemCount})`;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  // Enable/disable checkout button
  const checkoutBtn = document.querySelector(".checkout-button");
  if (checkoutBtn) {
    if (itemCount === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("disabled");
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove("disabled");
    }
  }

  // Store subtotal for Payment Page
  localStorage.setItem("cart-subtotal", subtotal.toFixed(2));
}

/**
 * ========================
 * Cart Quantity Adjustment
 * ========================
 * Handles +/- buttons in the shopping cart
 */
document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.querySelectorAll(".CartMainSection > div");

  cartItems.forEach((item) => {
    const minusBtn = item.querySelectorAll(".qty-btn")[0];
    const plusBtn = item.querySelectorAll(".qty-btn")[1];
    const qtyDisplay = item.querySelector(".qty-number");

    let quantity = parseInt(qtyDisplay.textContent);

    function updateButtons() {
      minusBtn.disabled = quantity <= 1;
      plusBtn.disabled = quantity >= 10;
    }

    // Increase quantity
    plusBtn.addEventListener("click", () => {
      if (quantity < 10) {
        quantity++;
        qtyDisplay.textContent = quantity;
        updateButtons();
        updateItemQuantityInStorage(item, quantity);
        updateCartSummary();
      }
    });

    // Decrease quantity
    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
        updateButtons();
        updateItemQuantityInStorage(item, quantity);
        updateCartSummary();
      }
    });

    updateButtons(); // Set initial button state
  });
});

// Used in quantity adjustment to update localStorage
function updateItemQuantityInStorage(itemElement, newQty) {
  if (itemElement.classList.contains("ITEM1")) {
    const item1 = JSON.parse(localStorage.getItem("cart-item-1"));
    if (item1) {
      item1.quantity = newQty;
      localStorage.setItem("cart-item-1", JSON.stringify(item1));
    }
  } else if (itemElement.classList.contains("ITEM2")) {
    const item2 = JSON.parse(localStorage.getItem("cart-item-2"));
    if (item2) {
      item2.quantity = newQty;
      localStorage.setItem("cart-item-2", JSON.stringify(item2));
    }
  }
}

/**
 * ======================
 * Heart Icon Toggle
 * ======================
 * Stores liked state in localStorage and toggles heart image
 */
document.addEventListener("DOMContentLoaded", function () {
  const hearts = document.querySelectorAll(".heart-icon");

  hearts.forEach((heart) => {
    const productId = heart.dataset.productId;
    const isLiked = localStorage.getItem(`liked-${productId}`) === "true";
    heart.src = isLiked
      ? "../Media/FilledHeartIcon.png"
      : "../Media/HeartIcon.png";

    heart.addEventListener("click", () => {
      const currentState =
        localStorage.getItem(`liked-${productId}`) === "true";
      const newState = !currentState;
      localStorage.setItem(`liked-${productId}`, newState);
      heart.src = newState
        ? "../Media/FilledHeartIcon.png"
        : "../Media/HeartIcon.png";

      // Animation effect
      heart.classList.remove("popped");
      void heart.offsetWidth;
      heart.classList.add("popped");
    });
  });
});

/**
 * ===============================
 * Payment Page: Load Subtotal
 * ===============================
 * Reads and displays subtotal stored in localStorage.
 */
document.addEventListener("DOMContentLoaded", function () {
  const priceElement = document.querySelector(".paymentFooter .price");
  const storedSubtotal = localStorage.getItem("cart-subtotal");

  if (storedSubtotal && priceElement) {
    priceElement.textContent = `$${storedSubtotal}`;
  }
});

// Generates a random 6 digit order ID
document.addEventListener("DOMContentLoaded", function () {
  const orderId = `#${Math.floor(100000 + Math.random() * 900000)}`;
  document.getElementById("order-id").textContent = orderId;
});
