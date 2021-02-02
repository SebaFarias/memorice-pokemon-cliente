const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "bundle.[fullhash].js",
    path: path.resolve(__dirname,'dist'),
    publicPath: ASSET_PATH,
  },
  mode:'production',
  devtool: 'eval-cheap-source-map',
  module:{
    rules: [
      {
        test: /\.(js||jsx)$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env','@babel/preset-react']
        }
        },
      resolve:{
          extensions: ['.js','.jsx'],
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },{
        test: /\.(png|jpe?g|svg)$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins:[
    new CleanWebpackPlugin(), new HtmlWebpackPlugin({
      template:'./public/index.html',
      favicon: './public/icon.svg',
  })],
  devServer: {
    port: 8000,
    contentBase: path.resolve(__dirname,'dist'),
    hot: true,
  }

}