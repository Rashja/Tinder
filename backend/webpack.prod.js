const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    clean: true,
  },
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: "/node_modules/",
        use: "ts-loader",
      },
    ],
  },
};
