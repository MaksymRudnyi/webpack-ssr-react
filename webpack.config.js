// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
//
// module.exports = {
//   mode: (process.env.NODE_ENV === 'production') ? 'production' : 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'build/[name].js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         use: 'babel-loader',
//         exclude: /node_modules/
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader',
//           'sass-loader'
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       filename: 'index.html',
//       template: path.resolve(__dirname, 'src/index.html')
//     }),
//     new MiniCssExtractPlugin({
//       filename: 'build/[name].css'
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: 'src/assets', to: 'assets' }
//       ]
//     })
//   ],
//   resolve: {
//     extensions: ['.js', '.jsx', '.scss']
//   },
//   devServer: {
//     port: 9000
//   },
//   devtool: 'source-map'
// }

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
