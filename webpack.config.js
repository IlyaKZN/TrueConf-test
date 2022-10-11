const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode:'development',
  entry:{
      index:'./src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./")
    },
    compress: true,
    port: 3000,
    open: true
  },
  module:{
    rules:[
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.js$/,
        loader:'babel-loader'
      },
      {
        test:/\.css$/,
        use:[
            'vue-style-loader',
            'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
            'vue-style-loader',
            'css-loader',
            'less-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new VueLoaderPlugin()
  ]
};