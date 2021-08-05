const path = require("path");

module.exports = {
  entry: [
    "./src/scripts/thirdParty/gsap.min.js",
    "./src/scripts/thirdParty/gsap.min.js",
    "./src/scripts/functions.js",
    "./src/scripts/components/audioControsl.js",
    "./src/scripts/components/timer.js",
    "./src/scripts/main.js",
    "./src/scripts/components/eventListeners.js",
    "./src/scripts/animation.js",
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
