import {
  setEventsForInput,
  checkInputActive,
  chekcInputValue,
} from "../shared-form.js";

const loginInputs = document.querySelectorAll(".input-box__input");
const submitNewCourseBtn = document.querySelector("#submit-new-course-btn");

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    chekcInputValue(loginInputs, doLog);
  }
});

submitNewCourseBtn.addEventListener("click", (event) => {
  chekcInputValue(loginInputs, doLog);
});

const doLog = () => {
  console.log("ahaa");
};

setEventsForInput(loginInputs);
