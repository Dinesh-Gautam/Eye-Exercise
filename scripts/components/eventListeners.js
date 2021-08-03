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
    className.contains("previous") && exercise.previous();
    className.contains("start") && timer.start();
    className.contains("pause") && timer.pause();
    className.contains("stop") && timer.stop();
    className.contains("next") && exercise.next();
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
  creatAnimation("modal", toggleModal, DOMSelectors.modal);
});

DOMSelectors.modal
  .querySelector(".modal-close-btn")
  .addEventListener("click", (event) => {
    creatAnimation("modal", toggleModal, DOMSelectors.modal, { reverse: true });
  });
