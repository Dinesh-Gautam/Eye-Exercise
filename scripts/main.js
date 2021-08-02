function RangeOfRandomNumbers(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

function setRandomBodyBackgroundColor() {
  const randomIndex = RangeOfRandomNumbers(0, 360);
  const color = `hsla(${randomIndex}, 10%, 10%, 1)`;
  DOMSelectors.body.style.backgroundColor = color;
  DOMSelectors.modal.style.backgroundColor = color;
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
function creatAnimation(animName, animFun, ele, { reverse = false } = {}) {
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
    animationTl[animName].play();
  }
  return animationTl[animName];
}
// function creatAnimationRev(animName, animFun, ele, { reverse = false } = {}) {
//   if (reverse) {
//     ele.style.display = "flex";
//     animationTl[animName].reverse();
//     return;
//   }

//   if (!animationTl[animName]) {
//     animationTl[animName] = animFun();
//   } else {
//     animationTl[animName].play();
//   }
//   animationTl[animName].then(() => {
//     ele.style.display = "none";
//   });
// }
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
  path: "assets/audio/",
  beep: "alarm_beep_3.mp3",
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
    muteButton.title = mute ? "Unmute" : "Mute";

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

const beepSound = new Audio(TimerAudio.path + TimerAudio.beep);

function AudioControl(type, value) {
  type === "mute" && TimerAudio.muteAndUnmute(!beepSound.muted);
  type === "volume" && TimerAudio.changeVolume(value);
}

class Timer {
  constructor(duration, intervalDuration, exerciseNo) {
    this.duration = duration;
    this.timeDuration = duration;
    this.intervalDuration = intervalDuration;
    this.timerInterval = null;

    this.totalExercisesNo = exerciseNo;
    this.currentExerciseNo = 0;
  }
  start() {
    DOMSelectors.timerContainer.style.opacity = 1;
    if (this.timerInterval !== null) return;
    creatAnimation(
      "timerViewerAnimation",
      timerAnimation,
      DOMSelectors.timerContainer
    );
    this.exerciselogger({ timerStarted: true });

    this.timerInterval = setInterval(() => {
      const currentDuration = this.timeDuration;
      this.timeDuration--;
      this.update();
      if (currentDuration <= 1) {
        this.stop();
        beepSound.play();
      }
    }, this.intervalDuration);
  }

  pause() {
    clearInterval(this.timerInterval);
    DOMSelectors.timerContainer.style.opacity = 0.5;
    this.exerciselogger({
      timerStarted: false,
    });
    this.timerInterval = null;
  }

  next() {
    this.currentExerciseNo <= this.totalExercisesNo - 1 &&
      this.currentExerciseNo++;
    console.log(this.currentExerciseNo);
    this.stop();
    this.exerciseUpdater("next");
  }
  previous() {
    this.currentExerciseNo !== 0 && this.currentExerciseNo--;
    this.stop();
    this.exerciseUpdater("prev");
  }

  stop() {
    creatAnimation(
      "timerViewerAnimation",
      timerAnimation,
      DOMSelectors.timerContainer,
      { reverse: true }
    );
    this.pause();
    this.resetTimer();
    this.update();
  }
  resetTimer() {
    this.timeDuration = this.duration;
  }
  restart() {
    this.currentExerciseNo = 0;
    this.stop();
    this.exerciseUpdater();
  }
  update() {
    const { timer } = DOMSelectors;
    timer.innerText = this.timeDuration === 60 ? "1:00" : this.timeDuration;
  }

  exerciseUpdater(type) {
    const { exerciseLabel, exercise, exerciseTutorial, modalContent } =
      DOMSelectors;

    if (this.exerciseCompeleteChecker()) {
      exercise.innerText = "All exercise complete";
      creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel, {
        reverse: true,
      });
      creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial, {
        reverse: true,
      });

      creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation);
      gsap.fromTo(
        ".control-buttons > button.primary",
        {
          opacity: 0,
          scale: 0,
          ease: Power2.easeOut,
        },
        { opacity: 1, scale: 1, ease: Power2.easeOut },
        "<"
      );
      this.exerciselogger({ allExerciseCompeleted: true });
      return;
    }
    this.exerciselogger({ allExerciseCompeleted: false });

    if (!(this.currentExerciseNo < this.totalExercisesNo)) {
      return;
    }

    if (exerciseLabel.style.display === "none") {
      console.log(exerciseLabel.style.display);
      creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel);
      creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial);
      creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation, null, {
        reverse: true,
      });
      creatAnimation("changeHeightTl", changeHeightAnimation);

      gsap.fromTo(
        ".control-buttons > button.primary",
        {
          opacity: 0,
          scale: 0,
          ease: Power2.easeOut,
        },
        { opacity: 1, scale: 1, ease: Power2.easeOut },
        "<"
      );
    }
    exerciseLabel.innerText = this.currentExerciseNo + 1;
    modalContent.innerText = EyeExercises[this.currentExerciseNo].tutorial;
    try {
      exerciseChangeAnim(type, () => {
        if (!(this.currentExerciseNo < this.totalExercisesNo)) {
          return;
        }
        console.log("Exercise No: " + this.currentExerciseNo);
        exercise.innerText = EyeExercises[this.currentExerciseNo].title;
      });
      if (EyeExercises[this.currentExerciseNo]) {
        changeExerciseTutorialAnimation(() => {
          if (!(this.currentExerciseNo < this.totalExercisesNo)) {
            return;
          }
          exerciseTutorial.querySelector("p").innerText =
            EyeExercises[this.currentExerciseNo].tutorial;
        });
      }
    } catch (err) {
      console.log(err.message);
      exerciseLabel.innerText = this.currentExerciseNo + 1;
      exercise.innerText = EyeExercises[this.currentExerciseNo].title;
      exerciseTutorial.querySelector("p").innerText =
        EyeExercises[this.currentExerciseNo].tutorial;
    }
  }

  exerciselogger({ allExerciseCompeleted = false, timerStarted = false } = {}) {
    const { timerControlButtons, timerContainer } = DOMSelectors;

    const [previous, start, pause, stop, next, restart] = timerControlButtons;

    if (allExerciseCompeleted) {
      setDisplay(restart, !allExerciseCompeleted, "flex");
      setDisplay(start, allExerciseCompeleted, "flex");
      setDisplay([start, pause, stop, next], allExerciseCompeleted, "flex");
    } else {
      setDisplay(restart, !allExerciseCompeleted, "flex");
      setDisplay([start, pause, stop, next], allExerciseCompeleted, "flex");
      setDisplay([start], timerStarted, "flex");
      setDisplay([pause, stop], !timerStarted, "flex");
      setDisplay([next, previous], timerStarted, "flex");
    }
  }

  exerciseCompeleteChecker() {
    return this.currentExerciseNo >= this.totalExercisesNo;
  }
}

let timer;
const timerConfig = {
  duration: 60,
  timerSpeed: 1000,
  NoOfExercises: EyeExercises.length,
};

function init() {
  const { duration, timerSpeed, NoOfExercises } = timerConfig;
  timer = new Timer(duration, timerSpeed, NoOfExercises);
  setRandomBodyBackgroundColor();
  timer.exerciseUpdater();
  TimerAudio.init();
}

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

DOMSelectors.exerciseTutorial.addEventListener("click", (event) => {
  // DOMSelectors.modal.style.display = "flex";
  // if (currentModalAnimationTimeline === null) {
  //   currentModalAnimationTimeline = toggleModal();
  // } else {
  //   currentModalAnimationTimeline.play();
  // }

  creatAnimation("modal", toggleModal, DOMSelectors.modal);
});

DOMSelectors.modal
  .querySelector(".modal-close-btn")
  .addEventListener("click", (event) => {
    creatAnimation("modal", toggleModal, DOMSelectors.modal, { reverse: true });
  });

init();
