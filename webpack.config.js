const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  entry: ["./src/scripts/thirdParty/gsap.min.js", "./src/scripts/main.js"],
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    // new WebpackMd5Hash(),
    new CopyWebpackPlugin([
      {
        from: "./src/icons",
        to: "./icons",
      },
      {
        from: "./src/manifest.json",
        to: "manifest.json",
      },
    ]),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      `...`,
      new CssMinimizerPlugin(),
      `...`,
      new HtmlMinimizerPlugin(),
    ],
  },
};
