function RangeOfRandomNumbers(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

function setRandomBodyBackgroundColor() {
  const randomIndex = RangeOfRandomNumbers(0, BackgroundColors.color.length);
  const color = BackgroundColors.color[randomIndex];
  DOMSelectors.body.style.backgroundColor = color;
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
};
const ImagesURL = {
  path: "../assets/",
  SvgImage: {
    play: this.path + "play-solid.svg",
    pause: this.path + "pause-solid.svg",
    stop: this.path + "stop-solid.svg",
    volumeOff: this.path + "volume_off_black_24dp.svg",
    volumeUp: this.path + "voluem_up_black_24dp.svg",
    next: this.path + "arrow-right-solid.svg",
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
    this.timerInterval = setInterval(() => {
      const currentDuration = this.timeDuration;
      this.timeDuration--;
      this.update();
      if (currentDuration <= 1) {
        this.stop();
        this.exerciseOver();
      }
    }, this.intervalDuration);
  }

  pause() {
    clearInterval(this.timerInterval);
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
      return;
    }

    exercise.innerText = exerciseNameString(this);

    function exerciseNameString(scope) {
      return `${scope.currentExerciseNo + 1}. ${
        EyeExercises[scope.currentExerciseNo]
      }`;
    }
  }

  exerciseOverChecker() {
    return this.currentExerciseNo >= this.totalExercisesNo;
  }
}

const timer = new Timer(60, 1000, EyeExercises.length);

function init() {
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

init();
