import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  mode: 'production',
  entry: './api/src/frameworks/docs/dummy-entry.js', // Tu archivo de entrada principal
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'), // Carpeta de salida
  },
  node: {
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/swagger-ui-dist/swagger-ui.css', to: 'swagger-ui.css' },
        { from: 'node_modules/swagger-ui-dist/swagger-ui-bundle.js', to: 'swagger-ui-bundle.js' },
        { from: 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js', to: 'swagger-ui-standalone-preset.js' },
        { from: 'node_modules/swagger-ui-dist/favicon-16x16.png', to: 'favicon-16x16.png' },
        { from: 'node_modules/swagger-ui-dist/favicon-32x32.png', to: 'favicon-32x32.png' }
      ]
    })
  ]
};
