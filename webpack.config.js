const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var ExtractTextPluginConfig = new ExtractTextPlugin("index_bundle.css");

const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.ts", "./styles/styles.scss"],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: "ts-loader",
      },
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              // reloadAll: true,
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "My generated index file with template",
      template: "index.html",
    }),
    new miniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  devServer: {
    static: "./public/",
    hot: true,
    devMiddleware: {
      publicPath: "/public/",
      writeToDisk: true,
    },
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  output: {
    publicPath: "public",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};