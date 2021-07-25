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
    view
      ? (element.style.display = "none")
      : (element.style.display = display || "block");
  }
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
  exerciseContainer: document.querySelector(".exercise-container"),
  audioControls: document.querySelector(".audio-controls"),
  audioControlButtons: document.querySelectorAll(".timer-audio-mute"),
  audioVolumeControlInput: document.querySelectorAll(".audio-volume-input"),
  audioVolumeControlLabel: document.querySelector(".audio-volume-percentage"),
};

const ImagesURL = {
  path: "assets/",
  SvgImage: {
    play: "play-solid.svg",
    pause: "pause-solid.svg",
    stop: "stop-solid.svg",
    volumeOff: "volume_off_black_24dp.svg",
    volumeUp: "volume_up_black_24dp.svg",
    next: "arrow-right-solid.svg",
  },
};

const EyeExercises = [
  "Blink for a minute",
  "Rotate your head while staring ahead",
  "Look to your right and left",
  "Close your eyes and relax",
  "Move your gaze in different directions",
  "Close and open your eyes",
  "Push against your temples with your fingers",
  "Draw geometric figures with your gaze",
  "Move your eyeballs up and down",
  "Strengthen your eyes’ near and far focusing",
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

    if (mute) {
      this.value.volume = 0;
    } else {
      const storedVolumeValue = this.getBeepVolumeFromLocalStorage(
        this.localStorageKeys.volume
      );
      this.value.volume = storedVolumeValue < 1 ? 100 : storedVolumeValue;
    }
    this.updateAdditional();
    this.setMuteValue(beepSound.muted);

    if (isInput) return;

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
    this.exerciseUpdater();

    if (this.timerInterval !== null) return;
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
    this.exerciselogger({
      timerStarted: false,
    });
    this.timerInterval = null;
  }

  next() {
    this.currentExerciseNo >= this.totalExercisesNo;
    this.currentExerciseNo++;
    this.stop();
    this.exerciseUpdater();
  }
  previous() {
    this.currentExerciseNo !== 0 && this.currentExerciseNo--;
    this.stop();
    this.exerciseUpdater();
  }

  stop() {
    this.pause();
    this.resetTimer();
    this.update();
  }
  resetTimer() {
    this.timeDuration = this.duration;
  }
  restart() {
    console.log("I am working");
    this.currentExerciseNo = 0;
    this.stop();
    this.exerciseUpdater();
  }
  update() {
    const { timer } = DOMSelectors;
    timer.innerText = this.timeDuration === 60 ? "1:00" : this.timeDuration;
  }

  exerciseUpdater() {
    const { exercise } = DOMSelectors;

    if (this.exerciseCompeleteChecker()) {
      exercise.innerText = "All exercise complete";
      this.exerciselogger({ allExerciseCompeleted: true });
      return;
    }
    this.exerciselogger({ allExerciseCompeleted: false });

    exercise.innerText = exerciseNameString(this);

    function exerciseNameString(scope) {
      return `${scope.currentExerciseNo + 1}. ${
        EyeExercises[scope.currentExerciseNo]
      }`;
    }
  }

  exerciselogger({ allExerciseCompeleted = false, timerStarted = false } = {}) {
    const { timerControlButtons, timerContainer } = DOMSelectors;

    const [previous, start, pause, stop, next, restart] = timerControlButtons;

    if (allExerciseCompeleted) {
      setDisplay(restart, !allExerciseCompeleted, "flex");
      setDisplay(start, allExerciseCompeleted, "flex");
      setDisplay(
        [timerContainer, start, pause, stop, next],
        allExerciseCompeleted,
        "flex"
      );
    } else {
      setDisplay(restart, !allExerciseCompeleted, "flex");
      setDisplay(
        [timerContainer, start, pause, stop, next],
        allExerciseCompeleted,
        "flex"
      );
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
  // saving input value
});

init();
