/**
 * Ensures that all input boxes have been filled in before users can proceed to Confirmation Page
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
    if (!fullName.value.trim()) isValid = false;
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) isValid = false;
    if (!/^\d{7,15}$/.test(phone.value.trim())) isValid = false;

    // Shipping validation
    if (!country.value.trim()) isValid = false;
    if (!shipping.value.trim()) isValid = false;
    if (!address.value.trim()) isValid = false;

    // Validate credit card section
    const creditCardDetails = cardName.closest(".payment-form");
    if (creditCardDetails && creditCardDetails.offsetParent !== null) {
      if (!cardName.value.trim()) isValid = false;
      if (!/^\d{13,19}$/.test(cardNumber.value.trim())) isValid = false;
      if (!/^\d{2}\/\d{2}$/.test(expiry.value.trim())) isValid = false;
      if (!/^\d{3,4}$/.test(cvv.value.trim())) isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      alert("Some fields are missing or incorrect.");
    } else {
      goToConfirm(); // proceed
    }
  });
});
