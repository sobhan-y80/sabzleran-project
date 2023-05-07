import { messageContactUs } from "./funcs/shared.js";
import { chekcInputValue, setEventsForInput } from "./shared-form.js";

const contactUsInputs = document.querySelectorAll(".input-box__input");
const submitBtn = document.querySelector("#send-message-btn");

// ============= Start Events =============

// = Start Evnet With CallBack Functions

// == Start Activeate The inputs
setEventsForInput(contactUsInputs);
// == Finish Activeate The inputs

submitBtn.addEventListener("click", () => {
  chekcInputValue(contactUsInputs, messageContactUs);
});

// = Finish Evnet With CallBack Functions
// ============= Finish Events =============
