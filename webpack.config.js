const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const mode = argv.mode || null;
  isDev = mode === 'development';
  srcPath = path.resolve(__dirname, './src/');
  distPath = path.resolve(__dirname, './dist/');

  return result = {
    entry: {
      index: path.resolve(srcPath, 'index.js'),
      catalog: path.resolve(srcPath, 'catalog.js')
    },
    output: {
      filename: "index.js",
      path: distPath,
      publicPath: "/"
    },
    devServer: {
      compress: true,
      hot: true,
      port: 8080,
      static: {
        directory: srcPath,
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },

        {
          test: /\.(css|s[ac]ss)$/,
          use: [
            "style-loader", "css-loader", "sass-loader"
          ],
        },
        {
          test: /\.(png|jp(e*)g|gif)$/,

          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/images/[name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.svg/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "assets/images/icons/[name].[ext]",
              },
            }
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(srcPath, 'index.html'),
        minify: isDev ? false : {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true,
          },
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(srcPath, 'catalog.html'),
        minify: isDev ? false : {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true,
          },
        chunks: ['catalog'],
      }),
      new MiniCssExtractPlugin(),
      new CleanPlugin.CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ]
  }
}