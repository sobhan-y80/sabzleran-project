import {
  showSelectItemInSelection,
  removeSelectItemInSelection,
} from "../funcs/utils.js";
import { setEventsForInput, chekcInputValue } from "../shared-form.js";

const $ = document;
const loginInputs = document.querySelectorAll(".input-box__input");

const filterSelectionName = $.querySelector("#custom-filter__selection-name");
const courseFilterSelectionParent = $.querySelector(
  ".custom-fillter__dropdown-list"
);
const courseFilteringSlection = $.querySelectorAll(
  ".custom-fillter__dropdown-item"
);

const submitNewCourseBtn = document.querySelector("#submit-new-course-btn");

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    chekcInputValue(loginInputs, doLog);
  }
});

courseFilterSelectionParent.addEventListener("click", (event) => {
  let elm = event.target;
  removeSelectItemInSelection(courseFilteringSlection);
  showSelectItemInSelection(elm, filterSelectionName);
});

submitNewCourseBtn.addEventListener("click", (event) => {
  chekcInputValue(loginInputs, doLog);
});

const doLog = () => {
  console.log("ahaa");
};

setEventsForInput(loginInputs);
