function RangeOfRandomNumbers(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

function setRandomBodyBackgroundColor() {
  const randomIndex = RangeOfRandomNumbers(0, BackgroundColors.color.length);
  const color = BackgroundColors.color[randomIndex];
  DOMSelectors.body.style.backgroundColor = color;
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

const ImagesURL = {
  path: "assets/",
  SvgImage: {
    play: "play_arrow.svg",
    pause: "pause.svg",
    stop: "stop.svg",
    volumeOff: "volume_off_black_24dp.svg",
    volumeUp: "volume_up_black_24dp.svg",
    next: "arrow_right_alt.svg",
  },
};

const EyeExercises = [
  { title: "Blink for a minute", tutorial: "1" },
  { title: "Rotate your head while staring ahead", tutorial: "2" },
  { title: "Look to your right and left", tutorial: "3" },

  { title: "Close your eyes and relax", tutorial: "4" },
  { title: "Move your gaze in different directions", tutorial: "5" },
  { title: "Close and open your eyes", tutorial: "6" },
  { title: "Push against your temples with your fingers", tutorial: "7" },
  { title: "Draw geometric figures with your gaze", tutorial: "8" },
  { title: "Move your eyeballs up and down", tutorial: "9" },
  { title: "Strengthen your eyes’ near and far focusing", tutorial: "10" },
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

    const muteSvg = ImagesURL.path + ImagesURL.SvgImage.volumeOff;
    const unmuteSvg = ImagesURL.path + ImagesURL.SvgImage.volumeUp;

    beepSound.muted = mute;
    muteImage.src = mute ? muteSvg : unmuteSvg;
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
    this.currentExerciseNo < this.totalExercisesNo && this.currentExerciseNo++;
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
    if (exerciseLabel.style.display === "none") {
      console.log(exerciseLabel.style.display);
      creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel);
      creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial);
      creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation, null, {
        reverse: true,
      }).then(() => {
        creatAnimation("changeHeightTl", changeHeightAnimation);
      });
    }
    if (this.exerciseCompeleteChecker()) {
      exercise.innerText = "All exercise complete";
      creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel, {
        reverse: true,
      });
      creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial, {
        reverse: true,
      });

      creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation);
      this.exerciselogger({ allExerciseCompeleted: true });
      return;
    }
    this.exerciselogger({ allExerciseCompeleted: false });
    exerciseLabel.innerText = this.currentExerciseNo + 1;
    modalContent.innerText = EyeExercises[this.currentExerciseNo].tutorial;
    try {
      exerciseChangeAnim(type, () => {
        exercise.innerText = EyeExercises[this.currentExerciseNo].title;
      });
      changeExerciseTutorialAnimation(() => {
        exerciseTutorial.querySelector("p").innerText =
          EyeExercises[this.currentExerciseNo].tutorial;
      });
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

    console.log("Running setDisplay");
    // gsap.from(".control-buttons > button", {
    //   stagger: 0.2,
    //   opacity: 0,
    //   y: "100%",
    //   ease: Power2.easeOut,
    // });

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
  // setRandomBodyBackgroundColor();
  timer.exerciseUpdater();
  TimerAudio.init();
}

//Event Listener

DOMSelectors.timerControlButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const className = event.target.classList;
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
