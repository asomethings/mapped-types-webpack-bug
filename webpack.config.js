const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  devtool: "inline-source-map",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  stats: "errors-only",
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^cache-manager$/,
      contextRegExp: /./,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^fastify-swagger$/,
      contextRegExp: /./,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^class-transformer\/storage$/,
      contextRegExp: /./,
    }),
  ],
};
