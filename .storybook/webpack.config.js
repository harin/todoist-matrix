// const config = require('../config/webpack.config.dev');
// // var genDefaultConfig = require('@storybook/core/dist/server/config/defaults/webpack.config.js');
// // module.exports = genDefaultConfig;
// module.exports = config;
const path = require("path");
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("ts-loader")
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: extractSass.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
  })

  config.plugins.push(new TSDocgenPlugin()); // optional
  config.plugins.push(extractSass);
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};