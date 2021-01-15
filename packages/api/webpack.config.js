const path = require('path');

module.exports = {
  entry: './dist/server.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node',
  mode: 'production',
  optimization: {
    minimize: true,
  },
};
