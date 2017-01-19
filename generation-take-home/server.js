
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express = require('express')
var path = require('path')
var port = process.env.PORT || 8080

var app = express()
app.use(express.static(__dirname))
app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.listen(port)
console.log('Server started');
/*
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});*/