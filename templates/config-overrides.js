/*
 * Create React App Rewired Configuration
 * Reference: https://github.com/timarney/react-app-rewired
 */

const Visualizer = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const rewireImageminPlugin = require('react-app-rewire-imagemin-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
  webpack: function(config, env) {
    // Rewire ESLint rules
    config = rewireEslint(config, env);

    if (env !== 'production') {
      /* Webpack used in development */

      // Bundle Analysis
      process.env.BUNDLE_ANALYZE &&
        config.plugins.push(
          new Visualizer({ filename: './public/bundle-size-analyzer.html' }),
          new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: './public/bundle-analyzer-report.html'
          })
        );

      // Enabling HMR
      config = rewireReactHotLoader(config, env);

      // Cache modules that we don't update frecuently
      config.plugins.push(
        new AutoDllPlugin({
          inject: true,
          debug: true,
          filename: '[name]_[hash].js',
          path: './dll',
          entry: {
            vendor: [
              'react',
              'react-dom',
              'react-loadable',
              'react-redux',
              'react-router-dom',
              'react-router-redux',
              'history',
              'redux'
            ]
          }
        })
      );
    } else {
      /* Webpack used in production */

      // Duplicate package alert
      config.plugins.push(
        new DuplicatePackageCheckerPlugin({
          verbose: true,
          emitError: true
        })
      );

      // Compress images - png, jpg, svg
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
    }
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      // TODO: Config your dev server
      // Example: Provide your own SSL credentials

      return config;
    };
  }
};
