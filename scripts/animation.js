function initialAnimation() {
  const tl = new gsap.timeline();
  //setting default values for gsap
  gsap.defaults({ duration: 0.4 });

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
    )
    .from("header > div", {
      stagger: 0.2,
      opacity: 0,
      y: -20,
      ease: Power2.easeOut,
    });
}

function toggleModal() {
  const tl = new gsap.timeline();

  tl.from(".modal", {
    opacity: 0,
    ease: Power2.easeOut,
  })
    .from(".popup-container", {
      x: "100%",
      ease: Power2.easeOut,
    })
    .from(
      ".modal-content p",
      {
        x: "-20%",
        opacity: 0,
        ease: Power2.easeOut,
      },
      "-=0.1"
    )
    .from(
      ".modal-close-btn",
      {
        x: 100,
        opacity: 0,
        ease: Power2.easeOut,
      },
      "-=0.1"
    )
    .from(
      ".modal-close-btn img",
      {
        rotate: "180deg",
        x: 50,
        ease: Power2.easeOut,
      },
      "-=0.1"
    );

  return tl;
}

function timerAnimation() {
  const tl = new gsap.timeline();

  tl.from(".timer-container", {
    opacity: 0,
    y: 50,
    scale: 0.8,
    ease: Power2.easeInOut,
  });

  return tl;
}

document.querySelector(".exercise-warper").style.height =
  document.querySelector(".exercise-warper").offsetHeight + "px";

function nexExerciseAnimation(cb) {
  const tl = new gsap.timeline();

  tl.fromTo(
    "#exercise",
    {
      x: 0,
      ease: Power2.easeInOut,
      opacity: 1,
    },
    {
      opacity: 0,
      ease: Power2.easeInOut,
      x: "20%",
      onComplete: cb,
    }
  )
    .to(".exercise-warper", {
      height: () => {
        let value =
          document.querySelector("#exercise").scrollHeight +
          parseInt(
            getComputedStyle(document.querySelector(".exercise-warper"))
              .paddingTop
          ) *
            2;
        return value;
      },
    })
    .fromTo(
      "#exercise",
      { opacity: 0, ease: Power2.easeInOut, x: "-20%" },
      { opacity: 1, ease: Power2.easeInOut, x: 0 }
    );

  return tl;
}
function prevExerciseAnimation(cb) {
  const tl = new gsap.timeline();
  tl.fromTo(
    "#exercise",
    { opacity: 1, ease: Power2.easeInOut, x: "0%" },
    { opacity: 0, ease: Power2.easeInOut, x: "-20%", onComplete: cb }
  )
    .to(".exercise-warper", {
      height: () => {
        let value =
          document.querySelector("#exercise").scrollHeight +
          parseInt(
            getComputedStyle(document.querySelector(".exercise-warper"))
              .paddingTop
          ) *
            2;
        return value;
      },
    })
    .fromTo(
      "#exercise",
      {
        opacity: 0,
        ease: Power2.easeInOut,
        x: "20%",
      },
      {
        x: "0%",
        ease: Power2.easeInOut,
        opacity: 1,
      }
    );

  return tl;
}

function exerciseChangeAnim(type, cb) {
  if (type === "next") {
    nexExerciseAnimation(cb);
  } else {
    prevExerciseAnimation(cb);
  }
}

timerAnimation();
initialAnimation();
