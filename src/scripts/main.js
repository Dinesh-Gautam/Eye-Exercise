import alarmBeep from "../assets/audio/alarm_beep_3.mp3";

function RangeOfRandomNumbers(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

function setRandomBodyBackgroundColor() {
  const randomIndex = RangeOfRandomNumbers(0, 360);
  const color = `hsla(${randomIndex}, 10%, 10%, 1)`;
  const AlphaColor = `hsla(${randomIndex}, 10%, 10%, 0.9)`;
  DOMSelectors.body.style.backgroundColor = color;
  DOMSelectors.modal.style.backgroundColor = AlphaColor;
  document.querySelector("meta[name=theme-color]").content = color;
}
function setDisplay(element, view, display) {
  if (typeof element === "object" && !(element instanceof Element)) {
    element.forEach((ele) => {
      setDisplay(ele, view, display);
    });
  } else {
    if (view) {
      element.style.display = "none";
    } else {
      element.style.display = display || "block";
    }
  }
}

const animationTl = {};
function creatAnimation(
  animName,
  animFun,
  ele,
  { reverse = false, playState } = {}
) {
  if (reverse) {
    if (animationTl[animName]) {
      animationTl[animName].reverse().then(() => {
        if (ele) {
          ele.style.display = "none";
        }
      });
    } else {
      animationTl[animName] = animFun();
      animationTl[animName].reverse(0).then(() => {
        if (ele) {
          ele.style.display = "none";
        }
      });
    }
    return animationTl[animName];
  }

  if (ele) {
    ele.style.display = "flex";
  }
  if (!animationTl[animName]) {
    animationTl[animName] = animFun();
  } else {
    playState === "unset"
      ? animationTl[animName].play()
      : animationTl[animName].play(0);
  }
  return animationTl[animName];
}

function isAnimationActive() {
  return Object.keys(animationTl).some((e) => animationTl[e].isActive());
}

const ColorRange = {
  min: 140,
  max: 220,
};

const BackgroundColors = {
  color: Array.from(
    { length: 10 },
    () =>
      `rgb(${RangeOfRandomNumbers(
        ColorRange.min,
        ColorRange.max
      )},${RangeOfRandomNumbers(
        ColorRange.min,
        ColorRange.max
      )},${RangeOfRandomNumbers(ColorRange.min, ColorRange.max)})`
  ),
};

const DOMSelectors = {
  body: document.querySelector("body"),
  timer: document.getElementById("timer"),
  exercise: document.getElementById("exercise"),
  timerControlButtons: document.querySelectorAll(".control-buttons button"),
  timerControlButtonsContainer: document.querySelector(".control-buttons"),
  timerContainer: document.querySelector(".timer-container"),
  exerciseLabel: document.querySelector(".exercise-index"),
  exerciseContainer: document.querySelector(".exercise-container"),
  audioControls: document.querySelector(".audio-controls"),
  audioControlButtons: document.querySelectorAll(".timer-audio-mute"),
  audioVolumeControlInput: document.querySelectorAll(".audio-volume-input"),
  audioVolumeControlLabel: document.querySelector(".audio-volume-percentage"),
  exerciseTutorial: document.querySelector(".exercise-tutorial"),
  modal: document.querySelector(".modal"),
  modalContent: document.querySelector(".modal .modal-content p"),
  checkIcon: document.querySelector(".check-image"),
};

const EyeExercises = [
  {
    title: "Blink your eyes",
    tutorial:
      "Blink your eyes for a minute. Do not blink too hard. It will clean your eyes by spreading your tears over its outer surface.",
  },
  {
    title: "Rotate your head while staring ahead",
    tutorial:
      "Move your head right to left while staring ahead. Then move your head up and down. Make sure you don't get distracted and only focus on the point you are looking at.",
  },
  {
    title: "Look to your right and left",
    tutorial:
      "Move your eyes right to left slowly. After half the time is over, close your eyes and repeat the process again. You can also move your eyes right to left while moving your eyes up and down (zig-zag pattern).",
  },

  {
    title: "Close your eyes and relax",
    tutorial:
      "Close your eyes and just relax. You can think about anything you want, you don't have to meditate, you are just relaxing while your eyes are closed.",
  },
  {
    title: "Move your gaze in different directions",
    tutorial:
      "Move your eyes in a circular motion, draw a horizontal eight with your eyes. When half the time is over, close your eyes and repeat the process.",
  },
  {
    title: "Close and open your eyes",
    tutorial:
      "Close and open your eyes. This exercise is similar to the first exercise but in this exercise, you have to close your eyes tightly and wait for 3 seconds.",
  },
  {
    title: "Push against your temples with your fingers",
    tutorial:
      "Slightly push against your temples with your fingers for 2 seconds and repeat the process until the time is over.",
  },
  {
    title: "Draw geometric figures with your gaze",
    tutorial:
      "Draw geometric figures with your eyes. The figures can be a rectangle, a square, a triangle, and more complex shapes such as a parallelogram and trapezium.",
  },
  {
    title: "Move your eyeballs up and down",
    tutorial:
      "Close your eyes and move your eyes up and down. You can also move your eyes up and down while moving your eyes right to left(like zig-zag) after halftime is over.",
  },
  {
    title: "Strengthen your eyes’ near and far focusing",
    tutorial:
      "Place your thumb close to your eyes and focus on it then look at something which is a little bit far away. you can also move your thumb close and far from the eyes. (make sure to only look at the thumb while moving your thumb).",
  },
];
const TimerAudio = {
  value: {
    muted: false,
    volume: 100,
  },
  localStorageKeys: {
    volume: "eye_workout_volume_value",
    mute: "eye_workout_mute_value",
  },
  muteAndUnmute(mute, isInput) {
    const { audioControlButtons } = DOMSelectors;
    const muteButton = audioControlButtons[0];
    const muteImage = audioControlButtons[0].querySelector(".mute-image");

    const muteSvg = document.querySelector(".mute-image");
    const unmuteSvg = document.querySelector(".unmute-image");

    beepSound.muted = mute;
    unmuteSvg.style.display = "revert";
    muteSvg.style.display = "revert";
    mute
      ? (muteSvg.style.display = "none")
      : (unmuteSvg.style.display = "none");
    muteButton.title = mute ? "Unmute (M)" : "Mute (M)";

    this.value.muted = beepSound.muted;

    if (mute || isInput) {
      if (!isInput) {
        this.value.volume = 0;
      }
    } else {
      const storedVolumeValue = this.getBeepVolumeFromLocalStorage(
        this.localStorageKeys.volume
      );
      this.value.volume = storedVolumeValue < 1 ? 100 : storedVolumeValue;
    }

    this.setMuteValue(beepSound.muted);

    if (isInput) return;
    this.updateAdditional();
    this.updateVolumeInputValue(this.value.volume);
  },

  updateVolumeInputValue(value) {
    const { audioVolumeControlInput } = DOMSelectors;

    audioVolumeControlInput[0].value = value;
  },
  updateAdditional() {
    document.querySelector(".custom-input-slider").style.width =
      this.value.volume + "%";

    DOMSelectors.audioVolumeControlLabel.innerText = `${this.value.volume}%`;
  },
  changeVolume(value) {
    this.value.volume = Number(value);
    this.value.volume < 1 && this.muteAndUnmute(true, true);
    this.value.volume > 0 && beepSound.muted && this.muteAndUnmute(false, true);
    this.updateAdditional();
  },

  getBeepVolumeFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  setVolumeValue() {
    this.setVolume();
    localStorage.setItem(this.localStorageKeys.volume, this.value.volume);
  },
  setMuteValue() {
    localStorage.setItem(this.localStorageKeys.mute, this.value.muted);
  },
  setVolume() {
    beepSound.volume = Number((Number(this.value.volume) / 1000).toFixed(3));
  },

  init() {
    this.value.volume =
      this.getBeepVolumeFromLocalStorage(this.localStorageKeys.volume) || 100;
    this.value.muted =
      this.getBeepVolumeFromLocalStorage(this.localStorageKeys.mute) || false;
    this.muteAndUnmute(this.value.volume < 1 || this.value.muted);
  },
};

const beepSound = new Audio(alarmBeep);

function AudioControl(type, value) {
  type === "mute" && TimerAudio.muteAndUnmute(!beepSound.muted);
  type === "volume" && TimerAudio.changeVolume(value);
}

let timeL;
let forwardExTl = null;
let clickDuration = 1,
  PrevClickDuration = 1;

class Timer {
  constructor(totalDuration, intervalDuration, exerciseArr) {
    this.totalDuration = totalDuration;
    this.timerValue = totalDuration;
    this.intervalDuration = intervalDuration;
    this.timerInterval = null;
    this.exercises = exerciseArr;
    this.totalExerciseNo = exerciseArr.length - 1;
    this.currentExerciseNo = 0;
  }
  start() {
    if (this.timerInterval !== null) return;
    gsap.to(DOMSelectors.timerContainer, {
      opacity: 1,
    });
    creatAnimation(
      "timerViewerAnimation",
      timerAnimation,
      DOMSelectors.timerContainer,
      {
        playState: "unset",
      }
    );
    this.timerInterval = setInterval(() => {
      const currentDuration = this.timerValue;
      this.timerValue--;
      this.updateTimer();
      if (currentDuration <= 1) {
        this.stop();
        beepSound.play();
      }
    }, this.intervalDuration);
    this.setControlBtnDisplay("timerStart");
  }
  stop() {
    creatAnimation(
      "timerViewerAnimation",
      timerAnimation,
      DOMSelectors.timerContainer,
      { reverse: true }
    );
    animationTl["allExerciseEndAnimation"] &&
      animationTl["allExerciseEndAnimation"].progress(1);
    this.clearTimerInterval();
    this.resetTimerValue();
    this.updateTimer();
    this.setControlBtnDisplay("timerStopped");
  }
  clearTimerInterval() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
  pause() {
    this.clearTimerInterval();
    gsap.to(DOMSelectors.timerContainer, {
      opacity: 0.5,
    });
    this.setControlBtnDisplay("timerStopped");
  }
  updateTimer() {
    const { timer } = DOMSelectors;
    timer.innerText = this.timerValue === 60 ? "1:00" : this.timerValue;
  }
  restart() {
    this.currentExerciseNo = 0;
    this.stop();
    this.exerciseUpdater();
  }

  resetTimerValue() {
    this.timerValue = this.totalDuration;
  }

  next() {
    if (this.currentExerciseNo > this.totalExerciseNo) return;

    this.stop();
    PrevClickDuration = 1;
    clickDuration++;

    if (forwardExTl) {
      if (forwardExTl.timeScale() > 0) {
        forwardExTl.timeScale(clickDuration);
      }

      forwardExTl.then(() => {
        this.currentExerciseNo++;
        clickDuration--;

        this.exerciseUpdater("next");
      });
    } else {
      this.currentExerciseNo++;
      this.exerciseUpdater("next");
    }
  }
  previous() {
    if (this.currentExerciseNo < 1) return;
    this.stop();

    clickDuration = 1;
    PrevClickDuration++;
    if (forwardExTl) {
      if (forwardExTl.timeScale() < 0) {
        forwardExTl.timeScale(-PrevClickDuration);
      }

      forwardExTl.then(() => {
        this.currentExerciseNo--;
        PrevClickDuration--;
        this.exerciseUpdater("prev");
      });
    } else {
      this.currentExerciseNo--;
      this.exerciseUpdater("prev");
    }
  }

  exerciseUpdater(type) {
    const {
      exerciseLabel,
      exercise,
      exerciseTutorial,
      modalContent,
      checkIcon,
    } = DOMSelectors;
    if (this.exerciseCompleteChecker()) {
      exercise.innerText = "All exercise complete";
      checkIcon.style.display = "flex";
      this.setControlBtnDisplay("allExerciseEnded");
      gsap.fromTo(
        ".control-buttons > button.primary",
        {
          opacity: 0,
          scale: 0,
          ease: Power2.easeOut,
        },
        { opacity: 1, scale: 1, ease: Power2.easeOut }
      );
      creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel, {
        reverse: true,
      });
      creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial, {
        reverse: true,
      });
      forwardExTl.kill();
      creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation);

      return;
    }

    if (!(this.currentExerciseNo <= this.totalExerciseNo)) {
      return;
    }
    animationTl["tutorialViewer"] && animationTl["tutorialViewer"].progress(1);
    if (exerciseLabel.style.display === "none") {
      creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel);

      animationTl["allExerciseEndAnimation"].progress(1);
      animationEndRev().then(() => {
        checkIcon.style.display = "none";
      });
    }
    if (exerciseTutorial.style.display === "none") {
      creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial);
    }
    exerciseLabel.innerText = this.currentExerciseNo + 1;
    modalContent.innerText = EyeExercises[this.currentExerciseNo].tutorial;
    try {
      exerciseChangeAnim(type, () => {
        if (this.currentExerciseNo > this.totalExerciseNo) return;
        exercise.innerText = EyeExercises[this.currentExerciseNo].title;
        changeHeightAnimation();
      });
      changeExerciseTutorialAnimation(() => {
        if (this.currentExerciseNo > this.totalExerciseNo) return;
        exerciseTutorial.querySelector("p").innerText =
          EyeExercises[this.currentExerciseNo].tutorial;
      });
    } catch (err) {
      exercise.innerText = EyeExercises[this.currentExerciseNo].title;
      exerciseTutorial.querySelector("p").innerText =
        EyeExercises[this.currentExerciseNo].tutorial;
    }
  }
  setControlBtnDisplay(type) {
    const { timerControlButtons } = DOMSelectors;

    const [previous, start, pause, stop, next, restart] = timerControlButtons;
    switch (type) {
      case "timerStart":
        timerStart();
        break;
      case "timerStopped":
        timerStop();
        break;
      case "allExerciseEnded":
        exercisesEnded();
        break;
    }

    function timerStart() {
      setDisplay([pause, stop], false, "flex");
      setDisplay([start, restart, next, previous], true, "flex");
    }
    function timerStop() {
      setDisplay([pause, stop, restart], true, "flex");
      setDisplay([start, next, previous], false, "flex");
    }
    function exercisesEnded() {
      setDisplay([pause, stop, start, next], true, "flex");
      setDisplay([restart, previous], false, "flex");
    }
  }
  exerciseCompleteChecker() {
    return this.currentExerciseNo > this.totalExerciseNo;
  }
}

let timer;
let exercise;
const timerConfig = {
  duration: 60,
  timerSpeed: 1000,
  NoOfExercises: EyeExercises.length,
};

function init() {
  const { duration, timerSpeed, NoOfExercises } = timerConfig;
  timer = new Timer(duration, timerSpeed, EyeExercises);
  setRandomBodyBackgroundColor();
  timer.exerciseUpdater();
  timer.setControlBtnDisplay("timerStopped");
  TimerAudio.init();
}

init();
//Event Listener
DOMSelectors.timerControlButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const className = event.target.classList;

    if (className.contains("primary")) {
      gsap.fromTo(
        ".control-buttons > button.primary",
        {
          opacity: 0,
          scale: 0,
          ease: Power2.easeOut,
        },
        { opacity: 1, scale: 1, ease: Power2.easeOut }
      );
    }
    className.contains("previous") && timer.previous();
    className.contains("start") && timer.start();
    className.contains("pause") && timer.pause();
    className.contains("stop") && timer.stop();
    className.contains("next") && timer.next();
    className.contains("restart") && timer.restart();
  });
});

DOMSelectors.audioControlButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const className = event.target.className;
    className === "timer-audio-mute" && AudioControl("mute");
  });
});

DOMSelectors.audioVolumeControlInput.forEach((input) => {
  // live changing value
  input.addEventListener("input", (event) => {
    const className = event.target.className;
    const value = event.target.value;
    className === "audio-volume-input" && AudioControl("volume", value);
  });

  input.addEventListener("change", (event) => {
    const className = event.target.className;
    const value = event.target.value;
    className === "audio-volume-input" && TimerAudio.setVolumeValue();
  });
});

let windowInDesktopMode = checkResponsive(
  Math.min(windowWidth(), windowHeight())
);

function checkResponsive(value) {
  return value > 600;
}
function windowWidth() {
  return window.innerWidth;
}
function windowHeight() {
  return window.innerWidth;
}

window.addEventListener("resize", () => {
  windowInDesktopMode = checkResponsive(windowWidth());
});

let clicked = false;

DOMSelectors.exerciseTutorial.addEventListener("click", (event) => {
  if (windowInDesktopMode) {
    if (clicked) {
      // creatAnimation("exerciseTutorialViewer", toggleTutorialViewer).reverse();

      creatAnimation("modal", toggleModal, DOMSelectors.modal);
    } else {
      // creatAnimation("exerciseTutorialViewer", toggleTutorialViewer);

      creatAnimation("modal", toggleModal, DOMSelectors.modal);
    }
    clicked = !clicked;
  } else {
    creatAnimation("modal", toggleModal, DOMSelectors.modal);
  }
});

DOMSelectors.modal
  .querySelector(".modal-close-btn")
  .addEventListener("click", () => {
    creatAnimation("modal", toggleModal, DOMSelectors.modal, { reverse: true });
  });

document.onkeyup = function (e) {
  switch (e.code) {
    case "ArrowRight":
      timer.next();
      break;
    case "ArrowLeft":
      timer.previous();
      break;
    case "KeyM":
      AudioControl("mute");
      break;
    case "Space":
      timer.timerInterval === null ? timer.start() : timer.pause();
      break;
    case "KeyK":
      timer.stop();
      break;
    case "KeyR":
      timer.restart();
      break;
  }
};

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
    delay: 0.25,
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
    scale: 2,
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
