function initialAnimation() {
  const tl = new gsap.timeline();
  //setting default values for gsap
  gsap.defaults({ duration: 0.7 });

  tl.smoothChildTimings = true;
  tl.from(".exercise-container", {
    x: "100%",
    opacity: 0,
    ease: Power2.easeOut,
    delay: 1,
  })
    .from("#exercise", {
      opacity: 0,
      ease: Power4.easeInOut,
      x: "-10%",
    })
    .from(".exercise-index", {
      scale: 0.7,

      opacity: 0,
      ease: Back.easeOut,
    })
    .from(
      ".exercise-tutorial",
      {
        ease: Power2.easeInOut,
        height: 0,
        padding: 0,
      },
      "<"
    )
    .from(
      ".exercise-tutorial p",
      {
        opacity: 0,
        y: "20%",
        ease: Power2.easeInOut,
      },
      "-=0.2"
    )
    .from(
      ".dropDown-icon img",
      {
        opacity: 0,
        y: "20%",
        rotate: "-160deg",
        ease: Power1.easeInOut,
      },
      "<"
    );
}

initialAnimation();
