class Timer {
  constructor(totalDuration, intervalDuration) {
    this.totalDuration = totalDuration;
    this.timerValue = totalDuration;
    this.intervalDuration = intervalDuration;
    this.timerInterval = null;
  }
  start() {
    if (this.timerInterval !== null) return;
    DOMSelectors.timerContainer.style.opacity = 1;
    creatAnimation(
      "timerViewerAnimation",
      timerAnimation,
      DOMSelectors.timerContainer
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
  }

  clearTimerInterval() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
  pause() {
    this.clearTimerInterval();
    DOMSelectors.timerContainer.style.opacity = 0.5;
  }
  updateTimer() {
    const { timer } = DOMSelectors;
    timer.innerText = this.timerValue === 60 ? "1:00" : this.timerValue;
  }
  stop() {
    creatAnimation(
      "timerViewerAnimation",
      timerAnimation,
      DOMSelectors.timerContainer,
      { reverse: true }
    );
    this.clearTimerInterval();
    this.resetTimerValue();
    this.updateTimer();
  }
  resetTimerValue() {
    this.timerValue = this.totalDuration;
  }
}
let timeL;
class Exercise {
  constructor(exerciseArr) {
    this.exercises = exerciseArr;
    this.totalExerciseNo = exerciseArr.length - 1;
    this.currentExerciseNo = 0;
  }

  next() {
    if (this.currentExerciseNo > this.totalExerciseNo) return;
    this.currentExerciseNo++;
    // this.stop();
    this.exerciseUpdater("next");
  }
  previous() {
    if (this.currentExerciseNo < 1) return;
    this.currentExerciseNo--;
    // this.stop();
    this.exerciseUpdater("prev");
  }

  exerciseUpdater(type) {
    const { exerciseLabel, exercise, exerciseTutorial, modalContent } =
      DOMSelectors;
    if (this.exerciseCompleteChecker()) {
      exercise.innerText = "All exercise complete";
      // gsap.from(exercise, {
      //   opacity: 0,
      //   ease: Power2.easeInOut,
      //   duration: 0.7,
      // });
      // gsap.fromTo(
      //   ".control-buttons > button.primary",
      //   {
      //     opacity: 0,
      //     scale: 0,
      //     ease: Power2.easeOut,
      //   },
      //   { opacity: 1, scale: 1, ease: Power2.easeOut }
      // );
      // creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel, {
      //   reverse: true,
      // });
      // creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial, {
      //   reverse: true,
      // });
      // creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation);
      return;
    }

    if (!(this.currentExerciseNo <= this.totalExerciseNo)) {
      return;
    }

    if (
      exerciseLabel.style.display === "none" ||
      exerciseTutorial.style.display === "none"
    ) {
      // creatAnimation("indexViewer", exerciseIndexAnimation, exerciseLabel);
      // creatAnimation("tutorialViewer", minTutorialAnimation, exerciseTutorial);
      // creatAnimation("allExerciseEndAnimation", allExerciseEndAnimation, null, {
      //   reverse: true,
      // });
      // creatAnimation("changeHeightTl", changeHeightAnimation);
      // gsap.fromTo(
      //   ".control-buttons > button.primary",
      //   {
      //     opacity: 0,
      //     scale: 0,
      //     ease: Power2.easeOut,
      //   },
      //   { opacity: 1, scale: 1, ease: Power2.easeOut }
      // );
    }
    exerciseLabel.innerText = this.currentExerciseNo + 1;
    modalContent.innerText = EyeExercises[this.currentExerciseNo].tutorial;
    try {
      if (timeL) {
        console.log(timeL);
        if (timeL.isActive()) {
          return;
        }
        exerciseChangeAnim(type, () => {
          console.log(this.currentExerciseNo);
          if (this.currentExerciseNo > this.totalExerciseNo) return;
          exercise.innerText = EyeExercises[this.currentExerciseNo].title;
        });
      } else {
        timeL = exerciseChangeAnim(type, () => {
          if (this.currentExerciseNo > this.totalExerciseNo) return;
          exercise.innerText = EyeExercises[this.currentExerciseNo].title;
        });
      }

      if (EyeExercises[this.currentExerciseNo]) {
        // changeExerciseTutorialAnimation(() => {
        // if (!(this.currentExerciseNo < this.totalExerciseNo - 1)) {
        // return;
        // }
        exerciseTutorial.querySelector("p").innerText =
          EyeExercises[this.currentExerciseNo].tutorial;
        // });
      }
    } catch (err) {
      console.error(err);
      exercise.innerText = EyeExercises[this.currentExerciseNo].title;
      exerciseTutorial.querySelector("p").innerText =
        EyeExercises[this.currentExerciseNo].tutorial;
    }
  }

  exerciseCompleteChecker() {
    return this.currentExerciseNo > this.totalExerciseNo;
  }
}

// Old Code

/*
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
      this.updateTimer();
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
*/
