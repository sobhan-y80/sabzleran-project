import { checkInputActive, clearValueInput } from "../shared-form.js";
import {
  mainUrl,
  showSwal,
  saveInfoLocalStorage,
  getInfoLocalStorage,
  getToken,
} from "./utils.js";

const register = () => {
  const nameInput = document.querySelector("#login-form__name-input");
  const usernameInput = document.querySelector("#login-form__username-input");
  const emailInput = document.querySelector("#login-form__email-input");
  const phoneInput = document.querySelector("#login-form__phone-input");
  const passwordInput = document.querySelector("#login-form__password-input");

  const newUserInfo = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };

  fetch(`${mainUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo),
  })
    .then((res) => {
      if (res.status === 201) {
        saveInfoLocalStorage("user", result.accessToken);
        showSwal(
          "ثبت نام با موفقیت انجام شود :))",
          "success",
          false,
          1000,
          (res) => {
            setTimeout(() => {
              // location.href = "index.html";
            }, 500);
          }
        );
        clearValueInput();
      } else if (res.status === 409) {
        showSwal(
          "به نظر میاد که نام کاربری یا ایمیلت قبلا استفاده شده :(",
          "warning",
          "باشه",
          null,
          (res) => {}
        );
        usernameInput.value = "";
        emailInput.value = "";
      }
      return res.json();
    })
    .catch((err) => {
      console.log(err);
      showSwal(
        "من متاسفم به نظر میاد مشکلی از سمت ما بوجود اومده ، تا زمانی که درستش میکنیم یکم منتظرمون باش",
        "error",
        "حله",
        null,
        (res) => {}
      );
    })
    .finally((data) => {
      checkInputActive();
    });
};

const login = () => {
  const identifierInput = document.querySelector("#login-form__username-input");
  const passwordInput = document.querySelector("#login-form__password-input");

  const userInfo = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`${mainUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  })
    .then((res) => {
      if (res.status === 200) {
        saveInfoLocalStorage("user", result.accessToken);
        showSwal("با موفقیت وارد شدید", "success", false, 1000, (res) => {
          setTimeout(() => {
            location.href = "index.html";
          }, 500);
        });
      } else if (res.status === 401) {
        showSwal(
          "به نظر میاد غلط املایی کوچیکی داخل اطلاعاتت داری ، دوباره چکشون کن",
          "error",
          "باشه",
          null,
          (res) => {}
        );
        identifierInput.value = "";
      }
      return res.json();
    })
    .finally((data) => {
      clearValueInput();
    });
};

const getMe = async () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  const res = await fetch(`${mainUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};

export { register, login, getMe };

console.log("authracton");
