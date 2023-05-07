import {
  getAndShowAllCourses,
  getAndShowPopularCourses,
  getAndShowPrevSollCourses,
  getAndShowArticles,
  paginatedItem,
} from "./funcs/shared.js";

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

window.addEventListener("load", () => {
  getAndShowAllCourses();
  getAndShowPopularCourses();
  getAndShowPrevSollCourses();
  getAndShowArticles();
});

VanillaTilt.init(document.querySelectorAll(".about-us__box"), {
  max: 10,
  speed: 100,
  glare: true,
  "max-glare": 1,
});

console.log("index.js");
