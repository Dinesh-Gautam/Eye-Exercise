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
