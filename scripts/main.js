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
    if (!view) {
      element.style.display = display || "none";
    } else {
      element.style.display = display || "block";
    }
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
  timerControlButtons: document.querySelectorAll(".play, .pause, .stop, .next"),
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
    this.timerInterval = null;
  }

  next() {
    this.currentExerciseNo++;
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
  update() {
    const { timer } = DOMSelectors;
    timer.innerText = this.timeDuration === 60 ? "1:00" : this.timeDuration;
  }

  exerciseUpdater() {
    const { exercise } = DOMSelectors;

    if (this.exerciseOverChecker()) {
      exercise.innerText = "All exercise complete";
      this.exerciseOver();
      return;
    }

    exercise.innerText = exerciseNameString(this);

    function exerciseNameString(scope) {
      return `${scope.currentExerciseNo + 1}. ${
        EyeExercises[scope.currentExerciseNo]
      }`;
    }
  }

  exerciseOver({ allExerciseOver = false } = {}) {
    const { timerControlButtonsContainer, timerContainer } = DOMSelectors;

    setDisplay([timerControlButtonsContainer, timerContainer], allExerciseOver);
  }

  exerciseOverChecker() {
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
    const className = event.target.className;
    className === "play" && timer.start();
    className === "pause" && timer.pause();
    className === "stop" && timer.stop();
    className === "next" && timer.next();
  });
});

DOMSelectors.audioControlButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const className = event.target.className;
    className === "timer-audio-mute" && AudioControl("mute");
  });
});

init();
