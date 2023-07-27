const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var ExtractTextPluginConfig = new ExtractTextPlugin("index_bundle.css");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // mode: "production",
  mode: "development",
  entry: ["./src/index.ts", "./styles.scss"],
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              // reloadAll: true,
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // {
      //   test: /\.(jpg|png|svg|gif)$/,
      //   type: "asset/resource",
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      //   type: "javascript/auto",
      //   // type: "asset/resource",
      //   // use: ["url-loader", "file-loader"],
      // },

      // { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "assets/resource" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "My generated index file with template",
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "assets", to: "assets" }],
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
    clean: true,
    // assetModuleFileName: "[name][ext]",
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
