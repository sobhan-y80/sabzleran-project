import { getMe } from "./Authentication.js";
import { clearValueInput } from "../shared-form.js";
import {
  isLogin,
  mainUrl,
  showCourseBox,
  showArticles,
  shuffledArray,
  getUrlParam,
  getToken,
  showSwal,
} from "./utils.js";

import { renderArticlesSlider } from "../gsap-slider.js";

const showUserNameInNavbar = () => {
  const navBarProfileBox = document.querySelector("#header__profile");
  const isUserLogin = isLogin();
  if (isUserLogin) {
    getMe().then((userInfo) => {
      navBarProfileBox.setAttribute("href", "index.html");
      navBarProfileBox.innerHTML = `<div class="main-header__account-btn">
      <span class="main-header__profile-name">${userInfo.username}</span>
      <span class="main-header__icon-wrapper">
        <i
          class="fa-solid fa-user main-header__profile-icon"
        ></i>
      </span>
    </div>
    <ul id="dropdown__profile" class="main-header__dropdown">
      <li class="main-header__item">
        <a href="#" class="main-header__link">پیشخوان</a>
      </li>
      <li class="main-header__item">
        <a href="#" class="main-header__link">سفارش ها</a>
      </li>
      <li class="main-header__item">
        <a href="#" class="main-header__link">کیف پول من</a>
      </li>
      <li class="main-header__item">
        <a href="#" class="main-header__link">جزعیات حساب</a>
      </li>
      <li class="main-header__item">
        <a href="#" class="main-header__link"
          >دوره های خریداری شده</a
        >
      </li>
      <li class="main-header__item">
        <a href="#" class="main-header__link"
          >تیکت های پشتیبانی</a
        >
      </li>
      <li class="main-header__item">
        <a href="#" id="logout" class="main-header__link hpc__DANGER"
          >خروج از سیستم</a
        >
      </li>
    </ul>`;
    });
  } else {
    navBarProfileBox.setAttribute("href", "login.html");
    navBarProfileBox.innerHTML = `
    <div class="main-header__account-btn">
      <span class="main-header__profile-login-text">ورود / ثبت نام</span>
    </div>`;
  }
};

const renderTopBarMenu = async () => {
  const CourseMenu = document.querySelector("#top-bar__course-menu");
  const res = await fetch(`${mainUrl}/menus/topbar`);
  const topBarMenu = await res.json();
  const shuffledArrayMenu = topBarMenu.sort((a, b) => 0.5 - Math.random());

  CourseMenu.innerHTML = "";

  [...shuffledArrayMenu].slice(0, 4).map((item) => {
    CourseMenu.innerHTML += `
    <li class="top-bar__item">
     <a href="${item.href}" class="top-bar__link">${item.title}</a>
    </li>
    `;
  });
};

const getAndShowMenu = async () => {
  const menuWrapper = document.querySelector("#menu__wrapper");

  const res = await fetch(`${mainUrl}/menus`);
  const menus = await res.json();

  menuWrapper.innerHTML = "";

  menus.slice(0, 6).map((menu) => {
    let subMenu = menu.submenus;
    let menuHasDropdown = subMenu.length ? true : false;

    menuWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <li class="main-header__item">
       <a href="category.html?page=1" class="main-header__link">
         ${menu.title}
         <div class="main-header__icon-wrapper">
           ${
             menuHasDropdown
               ? `<i class="fa-solid fa-angle-down main-header__link-icon"></i>`
               : ``
           }
         </div>
       </a>
       ${
         menuHasDropdown
           ? `
           <ul class="main-header__dropdown">
            ${subMenu.map((sub) => {
              return `
              <li class="main-header__item">
                <a href="#" class="main-header__link">${sub.title}</a>
              </li>`;
            })}
           </ul>
       `
           : ``
       }
    </li>
    `
    );
  });
};

const searchInArray = async (array, searchProperty, searchValue) => {
  let outputArray = [];

  outputArray = array.filter((item) =>
    item[searchProperty].toLowerCase().includes(searchValue.toLowerCase())
  );

  return outputArray;
};

const getAllCourses = async () => {
  const res = await fetch(`${mainUrl}/courses`);
  const coursesArray = await res.json();

  return coursesArray;
};

const getAndShowAllCourses = async () => {
  const courseContainer = document.querySelector("#courses__container");
  const res = await fetch(`${mainUrl}/courses`);
  const courses = await res.json();

  courseContainer.innerHTML = "";

  [...courses].slice(0, 6).map((course) => {
    courseContainer.innerHTML += `
       <div class="col-6 col-sm-6 col-md-4 col-lg-3 my-2">
        ${showCourseBox(
          course.shortName,
          course.cover,
          course.categoryID,
          course.name,
          course.price,
          course.price,
          course.registers
        )}
      </div>
    `;
  });
};

const getAndShowPopularCourses = async () => {
  const popularCoursesWrapper = document.querySelector(
    "#swiper__popular-courses-wrapper"
  );

  const res = await fetch(`${mainUrl}/courses/popular`);
  const popularCourses = await res.json();

  const shuffledPopularCourses = shuffledArray(popularCourses);

  popularCoursesWrapper.innerHTML = "";

  shuffledPopularCourses.slice(0, 5).forEach((course) => {
    popularCoursesWrapper.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
         ${showCourseBox(
           null,
           course.cover,
           course.categoryID,
           course.name,
           course.price,
           course.price,
           course.registers
         )}
     </div>
   `
    );
  });
};

const getAndShowPrevSollCourses = async () => {
  const swiperPrevsollContainer = document.querySelector(
    "#swiper__prevsoll-wrapper"
  );

  const res = await fetch(`${mainUrl}/courses/popular`);
  const PrevsollCourses = await res.json();

  const shuffledPrevsollCourses = shuffledArray(PrevsollCourses);

  shuffledPrevsollCourses.slice(0, 5).map((course) => {
    swiperPrevsollContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="swiper-slide">
         ${showCourseBox(
           null,
           course.cover,
           course.categoryID,
           course.name,
           course.price,
           course.price,
           course.registers
         )}
     </div>
   `
    );
  });
};

const getAndShowArticles = async () => {
  const articlesWrapper = document.querySelector("#articles__ring-wrapper");

  const res = await fetch(`${mainUrl}/articles`);
  const articles = await res.json();

  const shuffledArticles = shuffledArray(articles);

  articlesWrapper.innerHTML = "";

  shuffledArticles.slice(0, 6).forEach((article) => {
    articlesWrapper.insertAdjacentHTML(
      "beforeend",
      `
        ${showArticles(
          article.id,
          article.cover,
          article.title,
          article.description
        )}
    `
    );
  });
  renderArticlesSlider();
};

const getCourseDetails = async () => {
  // const courseShortName = getUrlParam("name");
  // fetch(`http://localhost:4000/v1/courses/html`, {
  //   method: "POST",
  //   Headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //   },
  // })
  //   .then((res) => {
  //     res.json();
  //   })
  //   .then((courseData) => {
  //     console.log(courseData);
  //   });
};

const messageContactUs = async () => {
  const usernameInputElm = document.querySelector(
    "#login-form__username-input"
  );
  const emailInputElm = document.querySelector("#login-form__email-input");
  const textareaInputElm = document.querySelector(
    "#login-form__textarea-input"
  );

  const messageContactUsInfos = {
    name: usernameInputElm.value.trim(),
    email: emailInputElm.value.trim(),
    phone: emailInputElm.value.trim(),
    body: textareaInputElm.value.trim(),
  };

  const res = await fetch(`${mainUrl}/contactnpm run dev`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageContactUsInfos),
  });
  res.status === 201
    ? showSwal(
        "پیامت با موفقیت ارسال شد ، منتظر پاسخمون باش :)",
        "success",
        "حله",
        null,
        (res) => {
          clearValueInput();
        }
      )
    : showSwal(
        "شرمنده به دلیل پاره ای از مشکلات نمیشه پیامت رو ارسال کنم ، لطفا چند لحظه بعد دوباره امتحان کن",
        "error",
        "باشه",
        null,
        (res) => {}
      );
};

const paginatedItem = (array, pagePerItem, pageCountWrapper, currentPage) => {
  let currentPageNum = Number(currentPage);

  pageCountWrapper.innerHTML = "";

  let endIndex = pagePerItem * currentPage;
  let startIndex = endIndex - pagePerItem;

  let pagindatedArray = array.slice(startIndex, endIndex);
  let paginationCount = Math.ceil(array.length / pagePerItem);

  // -1
  pageCountWrapper.insertAdjacentHTML(
    "beforeend",
    `
      <li class="global__pagination-item">
        <a href="" class="global__pagination-link" id="prevPageCountBtn">
          <i class="fa-solid fa-long-arrow-right"></i>
        </a>
      </li>
    `
  );
  for (let i = 1; i < paginationCount + 1; i++) {
    pageCountWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <li class="global__pagination-item">
          <a href="?page=${i}" class="global__pagination-link ${
        i === currentPageNum && `global__pagination-link--active`
      }">${i}</a>
        </li>
      `
    );
  }
  // +1
  pageCountWrapper.insertAdjacentHTML(
    "beforeend",
    `
      <li class="global__pagination-item">
        <a href="?page=" class="global__pagination-link" id="nextPageCountBtn">
          <i class="fa-solid fa-long-arrow-left"></i>
        </a>
      </li>
    `
  );

  return pagindatedArray;
};

export {
  showUserNameInNavbar,
  renderTopBarMenu,
  getAndShowMenu,
  searchInArray,
  getAllCourses,
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPrevSollCourses,
  getAndShowArticles,
  getCourseDetails,
  messageContactUs,
  paginatedItem,
};

console.log("funcs/shared.js");
