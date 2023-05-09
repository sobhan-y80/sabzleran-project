import { copyTableTextHandler } from "./funcs/utilst.js";
import {
  setEventsForInput,
  checkInputActive,
  chekcInputValue,
  ShowPassHandler,
} from "../../../js/shared-form.js";

const loginInputs = document.querySelectorAll(".input-box__input");
const submitNewCourseBtn = document.querySelector("#submit-new-course-btn");
const passwordInput = document.querySelector("#login-form__password-input");
const showPassBtn = document.querySelector(".password-box__btn");
const passBtnIcon = document.querySelector("#password-login__icon");

const userShowTable = document.querySelector(".table");

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    chekcInputValue(loginInputs, doLog);
  }
});

submitNewCourseBtn.addEventListener("click", (event) => {
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
