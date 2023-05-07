const renderArticlesSlider = () => {
  const ring = document.querySelector(".articles__ring");
  const articleBox = document.querySelectorAll(".article-wrapper-box");

  let xPos = 0;
  gsap
    .timeline()
    .set(ring, { rotationY: 80 /*180*/, cursor: "grab" }) //set initial rotationY so the parallax jump happens off screen
    .set(articleBox, {
      // apply transform rotations to each image
      rotateY: (i) => i * -36 /*-60*/,
      transformOrigin: "50% 50% 500px",
      z: -500,
      // backgroundImage: (i) =>
      // "url(https://picsum.photos/id/" + (i + 32) + "/600/400/)",
      // backgroundPosition: (i) => getBgPos(i),
      backfaceVisibility: "hidden",
    })
    .from(articleBox, {
      duration: 1.5,
      y: 200,
      opacity: 0,
      stagger: 0.09,
      ease: "expo",
    });

  $(window).on("mousedown touchstart", dragStart);
  $(window).on("mouseup touchend", dragEnd);

  function dragStart(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;
    xPos = Math.round(e.clientX);
    gsap.set(ring, { cursor: "grabbing" });
    $(window).on("mousemove touchmove", drag);
  }

  function drag(e) {
    if (e.touches) e.clientX = e.touches[0].clientX;

    gsap.to(ring, {
      rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
      onUpdate: () => {
        gsap.set(articleBox, { backgroundPosition: (i) => getBgPos(i) });
      },
    });

    xPos = Math.round(e.clientX);
  }

  function dragEnd(e) {
    $(window).off("mousemove touchmove", drag);
    gsap.set(ring, { cursor: "grab" });
  }

  function getBgPos(i) {
    //returns the background-position string to create parallax movement in each image
    return (
      100 -
      (gsap.utils.wrap(
        0,
        360,
        gsap.getProperty(ring, "rotationY") - 180 - i * 36
      ) /
        360) *
        500 +
      "px 0px"
    );
  }
};

export { renderArticlesSlider };
