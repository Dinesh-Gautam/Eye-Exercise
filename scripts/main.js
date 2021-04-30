function RangeOfRandomNumbers(min, max) {
  return ~~(Math.random() * (max - min)) + min;
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

DOMSelectors.body.style.backgroundColor =
  BackgroundColors.color[RangeOfRandomNumbers(0, BackgroundColors.length)];
