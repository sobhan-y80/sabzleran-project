import { login } from "./funcs/Authentication.js";
import {
  ShowPassHandler,
  chekcInputValue,
  setEventsForInput,
} from "./shared-form.js";
// ============= Start Variable =============
const loginBtn = document.querySelector("#login-btn");
const loginInputs = document.querySelectorAll(".input-box__input");
const passwordInput = document.querySelector("#login-form__password-input");
const showPassBtn = document.querySelector("#showPassInput");
const showPassIcon = document.querySelector("#password-login__icon");
// ============= Finish Variable =============

// ============= Start Events =============

// = Start Evnet With CallBack Functions

// == Start Activeate The inputs
setEventsForInput(loginInputs);
// == Finish Activeate The inputs

// = Finish Evnet With CallBack Functions
window.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    chekcInputValue(loginInputs, login);
  }
});

loginBtn.addEventListener("click", () => {
  chekcInputValue(loginInputs, login);
});

showPassBtn.addEventListener("click", () => {
  ShowPassHandler(passwordInput, showPassIcon);
});
// ============= Finish Events =============

console.log("login.js");
