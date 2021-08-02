class Timer {
  constructor(duration, intervalDuration, exerciseNo) {
    this.duration = duration;
    this.timeDuration = duration;
    this.intervalDuration = intervalDuration;
    this.timerInterval = null;
    this.exerciseRunning = true;
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
    this.exerciseRunning = !this.exerciseCompeleteChecker();
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
