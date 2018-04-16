// const config = require('../config/webpack.config.dev');
// // var genDefaultConfig = require('@storybook/core/dist/server/config/defaults/webpack.config.js');
// // module.exports = genDefaultConfig;
// module.exports = config;
const path = require("path");
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin");
module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("ts-loader")
  });
  config.plugins.push(new TSDocgenPlugin()); // optional
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};