// Takes users to Browsing Page from the Home Page
function goToBrowse1() {
  window.location.href = "HTML/BrowsingPage.html";
}

// Takes users to Browsing Page from all other pages
function goToBrowse2() {
  window.location.href = "BrowsingPage.html";
}

// Takes users to Product Page that displays Black Sweatershirt
function goToProduct1() {
  window.location.href = "ProductPage1.html";
}

// Takes users to Product Page that displays Air Jordan
function goToProduct2() {
  window.location.href = "ProductPage2.html";
}

// Takes users to Home Page
function goToHome() {
  window.location.href = "../index.html";
}

// Takes users to Shopping Cart Page
function goToCart() {
  window.location.href = "ShoppingCartPage.html";
}

// Takes users to Shopping Cart Page from the Home Page
function goToCart2() {
  sessionStorage.setItem("fromHomePage", "true");
  window.location.href = "HTML/ShoppingCartPage.html";
}

// Takes users to Payment Page
function goToPay() {
  window.location.href = "PaymentPage.html";
}

// Takes users to Confirmation Page
function goToConfirm() {
  window.location.href = "ConfirmationPage.html";
}

/**
 * Handles the behavior when the user clicks the exit icon on the Cart page.
 *
 * If the user navigated to the Cart page from the Home page (tracked via sessionStorage),
 * this function redirects them back to the Home page.
 * Otherwise, it redirects them to the browsing page as usual.
 */
function handleCartExit() {
  const fromHome = sessionStorage.getItem("fromHomePage");

  if (fromHome === "true") {
    sessionStorage.removeItem("fromHomePage"); // Clean up
    goToHome();
  } else {
    goToBrowse2(); // Default behavior
  }
}
