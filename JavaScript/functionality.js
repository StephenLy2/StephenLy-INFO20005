/**
 * Functionality for Quantity Button in Product Page
 */
document.addEventListener("DOMContentLoaded", function () {
  const quantityDisplay = document.getElementsById("quantity-number");
  const increaseBtn = document.getElementsById("increase");
  const decreaseBtn = document.getElementsById("decrease");

  if (!quantityDisplay || !increaseBtn || !decreaseBtn) {
    console.warn("Quantity elements not found on this page.");
    return;
  }

  let quantity = 1;

  function updateButtons() {
    decreaseBtn.disabled = quantity <= 1;
    increaseBtn.disabled = quantity >= 10;
  }

  increaseBtn.addEventListener("click", () => {
    if (quantity < 10) {
      quantity++;
      quantityDisplay.textContent = quantity;
      updateButtons();
    }
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      updateButtons();
    }
  });

  updateButtons();
});

/**
 * Functionality for Quantity Button in Shopping Cart Page
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

    plusBtn.addEventListener("click", () => {
      if (quantity < 10) {
        quantity++;
        qtyDisplay.textContent = quantity;
        updateButtons();
      }
    });

    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
        updateButtons();
      }
    });

    updateButtons(); // Set initial button state
  });
});
