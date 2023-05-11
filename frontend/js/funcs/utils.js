const mainUrl = `http://localhost:4000/v1`;

const showSwal = (title, icon, buttons, timer, callback) => {
  swal({
    title,
    icon,
    timer,
    buttons,
  }).then((result) => {
    callback();
  });
};

const showCourseBox = (
  courseHref,
  courseCover,
  courseCategory,
  courseName,
  coursePrice,
  courseOffPrice,
  courseRegisterd
) => {
  let courseTemplate;
  return (courseTemplate = `
    <div class="course-box">
     <div class="course-box__img-wrapper">
       <a href="product.html?name=${courseHref}" class="course-box__img-wrapper__link">
         <img
           class="course-box__img"
           src="http://localhost:4000/courses/covers/${courseCover}"
           width="100%"
           alt="course img"
         />
       </a>
     </div>
     <div class="course-box__content">
       <div class="course-box__title-wrapper">
         <span class="course-box__category">
           ${courseCategory}
         </span>
         <p class="course-box__name">
           <a class="course-box__link hpc__short-text" href="product.html?name=${courseHref}">${courseName}</a>
         </p>
     </div>
     <div class="course-box__price-wrapper">
         <span class="course-box__price hpc__off">
           <span class="course-box__price-number"
             >${(coursePrice + 200000).toLocaleString()}</span
           >
           <span class="course-box__price-text">تومان</span>
         </span>
         <span class="course-box__price-amount">
           <span class="course-box__price-amount-number">
             ${
               courseOffPrice === 0 ? "رایگان" : courseOffPrice.toLocaleString()
             }
           </span>
           <span class="course-box__price-amount-text">
           ${courseOffPrice !== 0 ? "تومان" : ""}
           </span>
         </span>
     </div>
     <div class="course-box__student-wrapper">
         <span class="course-box__studnet-count hpc__gold"
           >${courseRegisterd}</span
         >
         <span class="course-box__studnet-name">دانشجو</span>
     </div>
    </div>
  `);
};

const showArticles = (
  articleHref,
  articleCover,
  articleTitle,
  articleDescription
) => {
  return `
    <div class="article-wrapper-box d-flex align-items-center justify-content-center">
      <div class="article-box">
        <div class="article-box__img-wrapper">
          <div class="article-box__background-img" style="background-image: url(http://localhost:4000/courses/covers/${articleCover});"></div>
          <img
            class="article-box__img"
            src="http://localhost:4000/courses/covers/${articleCover}"
            alt=""
          />
        </div>
        <div class="article-box__content">
          <span class="article-box__title hpc__short-text">${articleTitle}</span>
          <span class="article-box__subtitle hpc__short-text">${articleDescription}</span>
          <a href="#" class="article-box__link">بیشتر بخون...</a>
        </div>
      </div>
    </div>
  `;
};

const shuffledArray = (array) => {
  return [...array].sort((a, b) => 0.5 - Math.random());
};

const saveInfoLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getInfoLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return userInfo ? userInfo : null;
};

const isLogin = () => {
  const userInfo = localStorage.getItem("user");
  return userInfo ? true : false;
};

const getUrlParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

const showSelectItemInSelection = (elm, selctionTitleName) => {
  elm.classList.add("custom-fillter__active");
  selctionTitleName.innerHTML = elm.innerHTML;
};

const removeSelectItemInSelection = (selctionItems) => {
  selctionItems.forEach((elm) => {
    elm.classList.remove("custom-fillter__active");
  });
};

export {
  mainUrl,
  showSwal,
  showCourseBox,
  showArticles,
  shuffledArray,
  saveInfoLocalStorage,
  getInfoLocalStorage,
  getToken,
  isLogin,
  getUrlParam,
  showSelectItemInSelection,
  removeSelectItemInSelection,
};

console.log("utils.js");
