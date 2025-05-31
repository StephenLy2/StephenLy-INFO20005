/**
 * Ensures that all input boxes have been filled in before users can proceed to Confirmation Page
 * Also clears the shopping cart after successful payment
 */

document.addEventListener("DOMContentLoaded", function () {
  // Gets all the input boxes
  const payButton = document.querySelector(".pay-button");

  payButton.addEventListener("click", function (e) {
    const fullName = document.querySelector("input[placeholder='Full Name']");
    const email = document.querySelector("input[placeholder='Email']");
    const phone = document.querySelector("input[placeholder='Phone Number']");

    const country = document.querySelector(
      "input[placeholder='Country/Region']"
    );
    const shipping = document.querySelector(
      "input[placeholder='Standard/Express']"
    );
    const address = document.querySelector("input[placeholder='Address']");

    const cardName = document.querySelector(
      "input[placeholder='Name on Card']"
    );
    const cardNumber = document.querySelector(
      "input[placeholder='Card Number']"
    );
    const expiry = document.querySelector(
      "input[placeholder='Expiry Date (MM/YY)']"
    );
    const cvv = document.querySelector("input[placeholder='CVV']");

    let isValid = true;

    // Contact validation
    if (!fullName.value.trim()) isValid = false; // Checks if field is empty
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) isValid = false; // Validates email format (e.g, user@example.com)
    if (!/^\d{7,15}$/.test(phone.value.trim())) isValid = false; // Only allow numbers and must be between 7-15 digits

    // Shipping validation
    if (!country.value.trim()) isValid = false; // Checks if field is empty
    if (!shipping.value.trim()) isValid = false; // Checks if field is empty
    if (!address.value.trim()) isValid = false; // Checks if field is empty

    // Validate credit card section
    const creditCardDetails = cardName.closest(".payment-form");
    if (creditCardDetails && creditCardDetails.offsetParent !== null) {
      if (!cardName.value.trim()) isValid = false; // Checks if field is empty
      if (!/^\d{13,19}$/.test(cardNumber.value.trim())) isValid = false; // Only allow numbers and must be between 13-19 digits
      if (!/^\d{2}\/\d{2}$/.test(expiry.value.trim())) isValid = false; // Must match MM/YY format
      if (!/^\d{3,4}$/.test(cvv.value.trim())) isValid = false; // Only allow numbers and must be 3 or 4 digits
    }

    if (!isValid) {
      e.preventDefault();
      alert("Some fields are missing or incorrect.");
    } else {
      // Validation successful, clear cart and proceed
      localStorage.removeItem("cart-item-1");
      localStorage.removeItem("cart-item-2");
      localStorage.removeItem("cart-subtotal");
      alert("Payment successful! Thank you for your purchase.");
      goToConfirm(); // proceed
    }
  });
});
