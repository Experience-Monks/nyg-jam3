const fs = require('fs');
const Visualizer = require('webpack-visualizer-plugin');
const rewireEslint = require('react-app-rewire-eslint');

const DEBUG = false;

module.exports = function override(config, env) {
  DEBUG && fs.writeFile('default-cra-rewrite-config.json', JSON.stringify(config));

  // Bundle Analizer - Visualizer
  DEBUG && config.plugins.push(new Visualizer({ filename: './public/bundle-size-analizer.html' }));

  // Rewire ESLint rules
  config = rewireEslint(config, env);

  DEBUG && fs.writeFile('final-cra-rewrite-config.json', JSON.stringify(config));
  return config;
};
