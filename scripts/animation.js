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
      ".dropDown-icon svg",
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
      ".dropDown-icon svg",
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
      ".modal-close-btn svg",
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

  tl.to(".timer-container", {
    opacity: 1,
    y: 0,
    height: "15vh",
    ease: Power2.easeInOut,
  });

  return tl;
}

document.querySelector(".exercise-warper").style.height =
  document.querySelector(".exercise-warper").offsetHeight + "px";

function forwardAnimation(cb) {
  const tl = new gsap.timeline();
  tl.smoothChildTimings = true;

  tl.fromTo(
    "#exercise",
    {
      opacity: 1,
      x: "0%",
      ease: Power2.easeInOut,
    },
    {
      opacity: 0,
      x: "20%",
      ease: Power2.easeInOut,
      onComplete: cb,
    }
  );

  tl.fromTo(
    "#exercise",
    {
      opacity: 0,
      x: "-20%",
      ease: Power2.easeInOut,
    },
    {
      opacity: 1,
      x: "0%",
      ease: Power2.easeInOut,
      onReverseComplete: cb,
    }
  );

  return tl;
}

function exerciseChangeAnim(type, cb) {
  if (type === "next") {
    forwardExTl === null
      ? (forwardExTl = forwardAnimation(cb))
      : forwardExTl.isActive()
      ? forwardExTl.then(() => forwardExTl.play(0))
      : forwardExTl.timeScale(1).play(0);
  } else {
    forwardExTl.isActive()
      ? forwardExTl.then(() => forwardExTl.reverse(0))
      : forwardExTl.timeScale(1).reverse(0);
  }
}

function allExerciseEndAnimation() {
  const tl = new gsap.timeline();
  tl.to("#exercise", {
    opacity: 0,
  });
  tl.to(".exercise-warper", {
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
    ease: Power2.easeOut,
  });

  tl.fromTo(
    ".check-image",
    {
      opacity: 0,
      scale: 6,
      x: "-150%",
      ease: Power2.easeOut,
    },
    {
      opacity: 1,
      scale: 2,
      x: "-150%",
      ease: Power2.easeOut,
    }
  );
  tl.to(".check-image", {
    scale: 1,
    x: "0%",
    delay: 1,
    ease: Power2.easeOut,
  });
  tl.fromTo(
    "#exercise",
    {
      opacity: 0,
      x: "-20%",
      ease: Power2.easeOut,
    },
    {
      opacity: 1,
      x: "0%",
      ease: Power2.easeOut,
    }
  );
  return tl;
}

function animationEndRev() {
  const tl = new gsap.timeline();

  tl.to(".check-image", {
    opacity: 0,
    scale: 10,
  });

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

function toggleTutorialViewer() {
  const tl = new gsap.timeline();

  tl.to(".exercise-tutorial p", {
    whiteSpace: "normal",
    width: "100%",
    overflow: "visible",
  });
  tl.to(".exercise-tutorial", {
    height: "100%",
  });

  return tl;
}

initialAnimation();
