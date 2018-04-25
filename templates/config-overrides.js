const fs = require('fs');
const Visualizer = require('webpack-visualizer-plugin');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireImageminPlugin = require('react-app-rewire-imagemin-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const DEBUG = false;

module.exports = function override(config, env) {
  DEBUG && fs.writeFile('default-cra-rewrite-config.json', JSON.stringify(config));

  // Bundle Analizer - Visualizer
  DEBUG && config.plugins.push(new Visualizer({ filename: './public/bundle-size-analizer.html' }));

  // Rewire ESLint rules
  config = rewireEslint(config, env);

  // Enabling HMR
  config = rewireReactHotLoader(config, env);

  // Compress images
  config = rewireImageminPlugin(config, env, {
    disable: process.env.NODE_ENV !== 'production',
    pngquant: {
      quality: '65-80'
    }
  });

  // Preload files
  config.plugins.push(
    new PreloadWebpackPlugin({
      rel: 'prefetch'
    })
  );

  DEBUG && fs.writeFile('final-cra-rewrite-config.json', JSON.stringify(config));
  return config;
};
