import { showSwal } from "./funcs/utils.js";

const ShowPassHandler = (passwordInput, passIcon, iconRoute = null) => {
  let iconCondition, passwordType;
  let conditionInputType = passwordInput.getAttribute("type");

  // Start If Icon Condition
  iconCondition =
    conditionInputType === "password"
      ? `${iconRoute ? iconRoute : ""}images/login/eye-open.svg`
      : `${iconRoute ? iconRoute : ""}images/login/eye-close.svg`;
  passIcon.setAttribute("src", iconCondition);
  // Finish If Icon Condition

  // Start If Password Type
  passwordType = conditionInputType === "password" ? "text" : "password";
  passwordInput.setAttribute("type", passwordType);
  // Finish If Password Type
};

const checkInputActive = () => {
  const formInputs = document.querySelectorAll(".input-box__input");
  formInputs.forEach((input) => {
    if (!input.value) {
      input.classList.remove("active");
    }
  });
};

const clearValueInput = () => {
  const formInputs = document.querySelectorAll(".input-box__input");

  formInputs.forEach((input) => (input.value = ""));
  checkInputActive();
};

const chekcInputValue = (inputs, callback) => {
  let inputValueFlag = true;

  const showingResault = (inputFlag) => {
    inputValueFlag = inputFlag;

    if (inputValueFlag) {
      callback();
      clearValueInput();
    } else {
      showSwal(
        "ععع یه قسمت رو جا برای کامل کردن جا گذاشتی :/",
        "error",
        "باشه",
        null,
        (res) => {}
      );
    }
  };

  inputs.forEach((input) => {
    !input.value && showingResault(false);
  });

  inputValueFlag && showingResault(true);
};

const setEventsForInput = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
      e.target.classList.add("active");
    });
    input.addEventListener("blur", (e) => {
      if (!e.target.value) {
        e.target.classList.remove("active");
      }
    });
  });
};

export {
  ShowPassHandler,
  checkInputActive,
  clearValueInput,
  chekcInputValue,
  setEventsForInput,
};

console.log("shared-form.js");
