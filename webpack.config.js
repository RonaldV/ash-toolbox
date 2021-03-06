const env = process.env.MIX_ENV === "prod" ? "production" : "development";
const Webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const path = require('path');

const plugins = {
  production: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],
  development: []
}

module.exports = {
  entry: [
    "./web/static/js/index.js"
  ],
  output: {
    path: "./priv/static",
    filename: "js/app.js",
    publicPath: "/",
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        plugins: ["transform-decorators-legacy"],
        presets: ["react", "es2015", "stage-2"],
      }
    }, {
      test: /(\.scss|\.css)$/,
      // loader: ExtractTextPlugin.extract('style', 'css!sass!toolbox'),
      // test: /(\.scss|\.css)$/,
      // loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass!toolbox'),
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
    }, {
      test: /\.png$/,
      loader: "url?" + [
        "limit=100000",
        "mimetype=image/png"
      ].join("&"),
    }, {
      test: /\.gif$/,
      loader: "url?" + [
        "limit=100000",
        "mimetype=image/gif"
      ].join("&"),
    }, {
      test: /\.jpg$/,
      loader: "file?name=images/[name].[ext]",
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url?" + [
        "limit=10000",
        "mimetype=application/font-woff",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.ttf$/,
      loader: "url?" + [
        "limit=10000",
        "mimetype=application/octet-stream",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.eot$/,
      loader: "url?" + [
        "limit=10000",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.svg$/,
      loader: "url?" + [
        "limit=10000",
        "mimetype=image/svg+xml",
        "name=images/[name].[ext]"
      ].join("&"),
    }],
  },
  sassLoader: {
      includePaths: [ path.resolve(__dirname, "web/static/styles"), path.resolve(__dirname, "node_modules") ]
  },
  // toolbox: { theme: __dirname + '/web/static/styles/theme.scss' },
  postcss: [
    Autoprefixer({
      browsers: ["last 2 versions"]
    })
  ],
  resolve: {
    root: __dirname + "/web/static/js",
    modulesDirectories: ["node_modules"],
    alias: {
      styles: __dirname + "/web/static/styles"
    },
    extensions: ["", ".js", ".scss", ".css"]
  },
  plugins: [
    // Important to keep React file size down
    new Webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(env),
      },
    }),
    new Webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("css/app.css"),
    new CopyPlugin([{from: "./web/static/assets"}])
  ].concat(plugins[env])
};


// npm i --save deps/phoenix react react-dom \
// react-redux react-router react-router-redux redux react-toolbox normalize.css react-addons-css-transition-group

// npm i --save-dev autoprefixer babel-core babel-loader \
// babel-plugin-transform-decorators-legacy babel-preset-es2015 \
// babel-preset-react babel-preset-stage-2 copy-webpack-plugin \
// css-loader extract-text-webpack-plugin file-loader imports-loader \
// node-sass sass-loader postcss-loader react-stdio redux-thunk \
// style-loader url-loader webpack