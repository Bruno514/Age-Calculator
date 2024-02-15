const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader',
            options: { 
                insert: 'head', // insert style tag inside of <head>
                injectType: 'singletonStyleTag' // this is for wrap all your style in just one style tag
            },
          },
          "css-loader",
          "sass-loader"
        ],
      },
      
    ],
  },
};
