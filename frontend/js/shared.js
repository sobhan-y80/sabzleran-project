import {
  showUserNameInNavbar,
  renderTopBarMenu,
  getAndShowMenu,
  searchInArray,
  getAllCourses,
} from "./funcs/shared.js";

// ===================== Start Search Bar =====================

const mainHeaderSearchbar = document.querySelector("#main-header__searchbar");
const mainHeaderSearchInput = document.querySelector(
  "#main-header__search-input"
);
const autoSearchBox = document.querySelector("#auto-search-box");

const activeElmHandler = (elm) => {
  elm.classList.add("active");
};

const removeActiveElmHandler = (elm) => {
  elm.classList.remove("active");
};

const suggestionsGenerator = (mainWordArray, userWord) => {
  autoSearchBox.innerHTML = "";

  let listSuggestWordArray = mainWordArray.map((fillterWord) => {
    return `
    <li class="main-header__search-box-item">
        <a class="main-header__search-box-link" href="${fillterWord.href}">
          ${fillterWord.name}
        </a>
    </li>`;
    //
  });

  let listSuggestWordElm;

  if (!listSuggestWordArray.length) {
    listSuggestWordElm = `
      <li class="main-header__search-box-item">
        <a class="main-header__search-box-link" href="">
          ${userWord}
        </a>
      </li>`;
  } else {
    listSuggestWordElm = listSuggestWordArray.join(" ");
  }

  autoSearchBox.innerHTML = listSuggestWordElm;
};

mainHeaderSearchInput.addEventListener("input", (event) => {
  let { value: userSearchWord } = event.target;

  if (userSearchWord) {
    activeElmHandler(mainHeaderSearchbar);
    getAllCourses().then((course) => {
      searchInArray(course, "name", userSearchWord).then((mainWordArray) => {
        suggestionsGenerator(mainWordArray, userSearchWord);
      });
    });
  } else {
    activeElmHandler(mainHeaderSearchbar);
  }
});

mainHeaderSearchInput.addEventListener("focus", () => {
  mainHeaderSearchInput.value ? activeElmHandler(mainHeaderSearchbar) : null;
});

mainHeaderSearchInput.addEventListener("blur", () => {
  removeActiveElmHandler(mainHeaderSearchbar);
});

// ===================== Finish Search Bar =====================

window.addEventListener("load", () => {
  showUserNameInNavbar();
  renderTopBarMenu();
  getAndShowMenu();
});

console.log("shared.js");
