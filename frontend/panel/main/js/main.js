const menuMobileWrapper = document.querySelector(
  ".panel-slidebar__mobile-wrapper"
);
const toggleMenuInput = document.querySelector("#toggleMenuInput");

window.addEventListener("click", (event) => {
  let isClickInside = menuMobileWrapper.contains(event.target);

  if (!isClickInside) {
    console.log("outside box");
    toggleMenuInput.checked = false;
  }
});
