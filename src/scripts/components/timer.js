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
