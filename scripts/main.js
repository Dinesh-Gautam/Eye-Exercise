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

  muteAndUnmute() {
    const { audioControlButtons } = DOMSelectors;
    const muteButton = audioControlButtons[0];
    const muteImage = audioControlButtons[0].querySelector(".mute-image");

    const mute = ImagesURL.path + ImagesURL.SvgImage.volumeOff;
    const unmute = ImagesURL.path + ImagesURL.SvgImage.volumeUp;

    beepSound.muted = !beepSound.muted;
    muteImage.src = beepSound.muted ? mute : unmute;
    muteButton.title = beepSound.muted ? "Unmute" : "Mute";
  },
};

const beepSound = new Audio(TimerAudio.path + TimerAudio.beep);

function AudioControl(type) {
  type === "mute" && TimerAudio.muteAndUnmute();
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

init();
