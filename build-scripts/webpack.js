process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

var webpack = require("webpack"),
config = require("../webpack.config");

delete config.chromeExtension;

config.mode = "development";
config.watch = true;

webpack(config, function (err) {
  if (err) throw err;
});
