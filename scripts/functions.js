function RangeOfRandomNumbers(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

function setRandomBodyBackgroundColor() {
  const randomIndex = RangeOfRandomNumbers(0, 360);
  const color = `hsla(${randomIndex}, 10%, 10%, 1)`;
  const AlphaColor = `hsla(${randomIndex}, 10%, 10%, 0.9)`;
  DOMSelectors.body.style.backgroundColor = color;
  DOMSelectors.modal.style.backgroundColor = AlphaColor;
}
function setDisplay(element, view, display) {
  if (typeof element === "object" && !(element instanceof Element)) {
    element.forEach((ele) => {
      setDisplay(ele, view, display);
    });
  } else {
    if (view) {
      element.style.display = "none";
    } else {
      element.style.display = display || "block";
    }
  }
}

const animationTl = {};
function creatAnimation(
  animName,
  animFun,
  ele,
  { reverse = false, playState } = {}
) {
  if (reverse) {
    if (animationTl[animName]) {
      animationTl[animName].reverse().then(() => {
        if (ele) {
          ele.style.display = "none";
        }
      });
    } else {
      animationTl[animName] = animFun();
      animationTl[animName].reverse(0).then(() => {
        if (ele) {
          ele.style.display = "none";
        }
      });
    }
    return animationTl[animName];
  }

  if (ele) {
    ele.style.display = "flex";
  }
  if (!animationTl[animName]) {
    animationTl[animName] = animFun();
  } else {
    playState === "unset"
      ? animationTl[animName].play()
      : animationTl[animName].play(0);
  }
  return animationTl[animName];
}

function isAnimationActive() {
  return Object.keys(animationTl).some((e) => animationTl[e].isActive());
}
