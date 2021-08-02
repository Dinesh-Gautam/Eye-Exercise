function exerciseIndexAnimation() {
  const tl = new gsap.timeline();
  tl.from(".exercise-index", {
    x: "-110%",
    opacity: 0,
    ease: Power2.easeOut,
  });
  return tl;
}

function minTutorialAnimation() {
  const tl = new gsap.timeline();
  tl.from(
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

  return tl;
}

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
      x: "-110%",
      opacity: 0,
      ease: Power2.easeOut,
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
    })
    .from(
      ".control-buttons > button.next",
      {
        opacity: 0,
        x: "20%",
        ease: Power2.easeOut,
      },
      "<"
    )
    .from(
      ".control-buttons > button.previous",
      {
        opacity: 0,
        x: "-20%",
        ease: Power2.easeOut,
      },
      "<"
    )
    .from(
      ".control-buttons > button.primary",
      {
        stagger: 0.2,
        opacity: 0,
        scale: 0,
        ease: Power2.easeOut,
      },
      "<"
    );
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
  const tl = new gsap.timeline({ immediateRender: true });

  tl.from(".timer-container", {
    opacity: 0,
    y: 50,
    height: 0,
    ease: Power2.easeInOut,
  });

  return tl;
}

document.querySelector(".exercise-warper").style.height =
  document.querySelector(".exercise-warper").offsetHeight + "px";

// function nexExerciseAnimation(stl, cb) {
//   if (nextAnimationTl) {
//     if (nextAnimationTl.isActive()) {
//       nextAnimationTl.tweenTo(10);
//     }
//     nextAnimationTl.resume();

//     // return;
//   }

//   if (!nextAnimationTl) {
//     const tl = new gsap.timeline();
//     console.log("creating new tl");
//     tl.to("#exercise", {
//       opacity: 0,
//       ease: Power2.easeInOut,
//       x: "20%",
//       immediateRender: true,
//       onComplete: cb,
//     })
//       .to(".exercise-warper", {
//         height: () => {
//           let value =
//             document.querySelector("#exercise").scrollHeight +
//             parseInt(
//               getComputedStyle(document.querySelector(".exercise-warper"))
//                 .paddingTop
//             ) *
//               2;
//           return value;
//         },
//       })
//       .fromTo(
//         "#exercise",
//         { opacity: 0, ease: Power2.easeInOut, x: "-20%" },
//         { opacity: 1, ease: Power2.easeInOut, x: 0 }
//       );

//     return tl;
//   }
// }
// function prevExerciseAnimation(cb) {
//   const tl = new gsap.timeline();
//   tl.fromTo(
//     "#exercise",
//     { opacity: 1, ease: Power2.easeInOut, x: "0%" },

//     {
//       opacity: 0,
//       immediateRender: true,
//       ease: Power2.easeInOut,
//       x: "-20%",
//       onComplete: cb,
//     }
//   )
//     .to(".exercise-warper", {
//       height: () => {
//         let value =
//           document.querySelector("#exercise").scrollHeight +
//           parseInt(
//             getComputedStyle(document.querySelector(".exercise-warper"))
//               .paddingTop
//           ) *
//             2;
//         return value;
//       },
//     })
//     .fromTo(
//       "#exercise",
//       {
//         opacity: 0,
//         ease: Power2.easeInOut,
//         x: "20%",
//       },
//       {
//         x: "0%",
//         ease: Power2.easeInOut,
//         opacity: 1,
//       }
//     );

//   return tl;
// }
// let nextAnimationTl = null;
// function exerciseChangeAnim(type, cb) {
//   if (type === "next") {
//     if (nextAnimationTl) {
//       nextAnimationTl.kill();
//       console.log("killing old Tl");
//     }
//     nextAnimationTl = nexExerciseAnimation(nextAnimationTl, cb);

//     // console.log(nextAnimationTl);
//   } else {
//     prevExerciseAnimation(cb);
//   }
// }

function forwardAnimation(tl) {
  tl.to("#exercise", {
    opacity: 0,
    x: "20%",
    ease: Power2.easeInOut,
  });
}

function forwardAnimationRev(tl, delay, xValue, durationValue) {
  tl.fromTo(
    "#exercise",
    {
      opacity: 0,
      x: xValue || "20%",
      duration: durationValue || gsap.defaults().duration,
      ease: Power2.easeInOut,
      delay: delay || 0,
    },
    {
      opacity: 1,
      x: "0%",
      ease: Power2.easeInOut,
    }
  ).to(
    ".exercise-warper",
    {
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
    },
    "<"
  );
}

function backwardAnimation(tl, delay, xValue, durationValue) {
  tl.to(".exercise-warper", {
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
    duration: durationValue || gsap.defaults().duration,
  })
    .to(
      "#exercise",
      {
        opacity: 0,
        ease: Power2.easeInOut,
      },
      "<"
    )
    .fromTo(
      "#exercise",
      {
        opacity: 0,
        x: xValue || "-20%",
        duration: durationValue || gsap.defaults().duration,
        ease: Power2.easeInOut,
        delay: delay || 0,
      },
      {
        opacity: 1,
        x: "0%",
        ease: Power2.easeInOut,
      },
      "<"
    );
}

function backwardAnimationRev(tl, delay, xValue, durationValue) {
  tl.to("#exercise", {
    opacity: 0,
    x: "-20%",
    ease: Power2.easeInOut,
  });
}
let exTl = new gsap.timeline({ immediateRender: true });
exTl.smoothChildTimings = true;
function exerciseChangeAnim(type, cb) {
  if (type === "next") {
    console.log("next Exercise");
    if (exTl.isActive()) {
      exTl.then(() => {
        backwardAnimation(exTl, 0, "-10%", 0.1);
        cb();
      });
    } else {
      forwardAnimation(exTl);
      exTl.then(() => {
        console.log("then");
        cb();
        backwardAnimation(exTl);
      });
    }
  } else {
    if (exTl.isActive()) {
      exTl.then(() => {
        cb();
        forwardAnimationRev(exTl, 0, "10%");
      });
    } else {
      backwardAnimationRev(exTl);
      exTl.then(() => {
        cb();
        forwardAnimationRev(exTl);
      });
    }
  }
}

function allExerciseEndAnimation() {
  const tl = new gsap.timeline();

  tl.fromTo(
    ".check-image",
    {
      display: "none",
      opacity: 0,
      x: "100%",
      ease: Power2.easeOut,
    },
    { display: "flex", opacity: 1, x: "0%", ease: Power2.easeOut }
  )
  .to(
    ".exercise-warper",
    {
      alignItems: "center",
      height: () => {
        let value =
          document.querySelector("#exercise").scrollHeight +
          parseInt(
            getComputedStyle(document.querySelector(".exercise-warper"))
              .paddingTop
          ) *
            2;
        return value * 2;
      },
    },
    "<"
  );
  // .to(
  //   "main",
  //   {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   "<"
  // );

  // ).to(".exercise-warper", {
  //   padding : ""
  // });
  return tl;
}

function changeHeightAnimation() {
  const tl = new gsap.timeline();

  tl.to(".exercise-warper", {
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
  });
  return tl;
}

function changeExerciseTutorialAnimation(cb) {
  const tl = new gsap.timeline({ immediateRender: true });

  tl.to(".exercise-tutorial p", {
    opacity: 0,
    ease: Power2.easeInOut,
    delay: -0.1,
    onComplete: cb,
  }).to(".exercise-tutorial p", {
    opacity: 1,
    ease: Power2.easeInOut,
  });

  return tl;
}

initialAnimation();
