// Start Varieble Toggle Menu Handler

const menuMobileWrapper = document.querySelector(
  ".panel-slidebar__mobile-wrapper"
);
const toggleMenuInput = document.querySelector("#toggleMenuInput");

// Finish Varieble Toggle Menu Handler
// Start Toggle Menu Handler Func

window.addEventListener("click", (event) => {
  let isClickInside = menuMobileWrapper.contains(event.target);
  if (!isClickInside) {
    toggleMenuInput.checked = false;
  }
});

// Finish Toggle Menu Handler Func
