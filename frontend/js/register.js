import { register } from "./funcs/Authentication.js";
import {
  ShowPassHandler,
  chekcInputValue,
  setEventsForInput,
} from "./shared-form.js";

// ============= Start Variable =============

const registerInputs = document.querySelectorAll(".input-box__input");

const registerBtn = document.querySelector("#register-btn");
const remmberMyPassLabel = document.querySelector(
  ".login-form__remember-me-label"
);

const passwordInput = document.querySelector("#login-form__password-input");
const showPassBtn = document.querySelector(".password-box__btn");
const showPassBtnIcon = document.querySelector("#password-login__icon");
const remmberMyPassCheckBox = document.querySelector(
  "#login-form__remember-me-password"
);

// ============= Finish Variable =============

// ============= Start Events =============

// = Start Evnet With CallBack Functions

remmberMyPassCheckBox.addEventListener("change", (event) => {
  remmberMyPassLabel.classList.toggle("animate__animated");
});

// == Start Activeate The inputs

setEventsForInput(registerInputs);

// == Finish Activeate The inputs

// = Finish Evnet With CallBack Functions

showPassBtn.addEventListener("click", () => {
  ShowPassHandler(passwordInput, showPassBtnIcon);
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    chekcInputValue(registerInputs, register);
  }
});

registerBtn.addEventListener("click", (event) => {
  chekcInputValue(registerInputs, register);
});

// ============= Finish Events =============

console.log("register.js");
