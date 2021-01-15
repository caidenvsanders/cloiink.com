const path = require('path');

module.exports = {
  entry: './dist/src/server.js',
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
