import {
  mainUrl,
  showCourseBox,
  getUrlParam,
  showSelectItemInSelection,
  removeSelectItemInSelection,
} from "./funcs/utils.js";
import { getAllCourses } from "./funcs/shared.js";
import { paginatedItem } from "./funcs/shared.js";

const $ = document;
const filterSelectionName = $.querySelector("#custom-filter__selection-name");
const courseFilterSelectionParent = $.querySelector(
  ".custom-fillter__dropdown-list"
);
const courseFilteringSlection = $.querySelectorAll(
  ".custom-fillter__dropdown-item"
);
const paginationWrapper = $.querySelector("#pagination-wrapper");

// Start Function
// = Start Category Sorting Course

// // == Start Get Course Of Server
// const getCategoryCourses = async () => {
//   const res = await fetch(`${mainUrl}/courses`);
//   const courses = await res.json();

//   return courses;
// };
// // == Finish Get Course Of Server

// == Start show Course In Dom
const showCategoryCourses = (coursesArray) => {
  const courseCategoryWrapper = document.querySelector(
    "#course__category-wrapper"
  );

  courseCategoryWrapper.innerHTML = "";

  // Start Pagination Category

  let curentPage = getUrlParam("page");
  let shownCourse = paginatedItem(
    [...coursesArray],
    3,
    paginationWrapper,
    curentPage
  );

  // Finish Pagination Category

  // Start show Course

  shownCourse.map((course) => {
    courseCategoryWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <div class="col-6 col-sm-6 col-md-4 col-lg-3 my-2">
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

  // Finish show Course
};
// == Finish show Course In Dom

// == Start Course Soting

const courseSorting = (array, filterType) => {
  let outputArray = [];

  switch (filterType) {
    case "free": {
      outputArray = array.filter((course) => course.price === 0);
      break;
    }
    case "money": {
      outputArray = array.filter((course) => course.price !== 0);
      break;
    }
    case "score": {
      outputArray = array.filter((course) => course.courseAverageScore);
      break;
    }
    case "last": {
      outputArray = [...array].reverse();
      break;
    }
    case "default": {
      outputArray = array;
      break;
    }
    default: {
      outputArray = array;
    }
  }
  return outputArray;
};
// == Finish Course Soting

// = Finish Category Sorting Course

// Finish Function

// Start event

// = Start Sorting Course By Category
courseFilterSelectionParent.addEventListener("click", (event) => {
  let { tagName: tagElm, dataset } = event.target;
  let userFilteringSelection = dataset.key;

  if (tagElm === "LI") {
    removeSelectItemInSelection(courseFilteringSlection);
    showSelectItemInSelection(event.target, filterSelectionName);

    getAllCourses().then((courses) => {
      showCategoryCourses(courseSorting(courses, userFilteringSelection));
    });
  }
});
// = Start Sorting Course By Category

// = Start Show Course In Dom
window.addEventListener("load", () => {
  getAllCourses().then((courses) => {
    showCategoryCourses(courses);
  });
});
// = Start Show Course In Dom
// Finish event

console.log("category.js");
