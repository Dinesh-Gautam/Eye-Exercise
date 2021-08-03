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

init();
