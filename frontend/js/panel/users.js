import { copyTableTextHandler } from "./funcs/utilst.js";
import {
  setEventsForInput,
  checkInputActive,
  chekcInputValue,
  ShowPassHandler,
} from "../shared-form.js";

const loginInputs = document.querySelectorAll(".input-box__input");
const submitNewUserBtn = document.querySelector("#submit-new-user-btn");
const passwordInput = document.querySelector("#login-form__password-input");
const showPassBtn = document.querySelector(".password-box__btn");
const passBtnIcon = document.querySelector("#password-login__icon");

const userShowTable = document.querySelector(".table");

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    chekcInputValue(loginInputs, doLog);
  }
});

submitNewUserBtn.addEventListener("click", (event) => {
  chekcInputValue(loginInputs, doLog);
});

showPassBtn.addEventListener("click", () => {
  ShowPassHandler(passwordInput, passBtnIcon, "../../");
});

const doLog = () => {
  console.log("ahaa");
};

setEventsForInput(loginInputs);
copyTableTextHandler(userShowTable);
