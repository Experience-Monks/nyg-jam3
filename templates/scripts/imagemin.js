const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const chalk = require('chalk');

/**
 * Helper functions to get directories / sub-directories
 *
 * @see https://stackoverflow.com/a/40896897/4364074
 */
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isDirectory);
const getDirectoriesRecursive = source => [
  source,
  ...getDirectories(source)
    .map(getDirectoriesRecursive)
    .reduce((a, b) => a.concat(b), [])
];

/**
 * List of input directories
 */
let INPUT_DIRECTORIES = [];

['build/static/media', 'build/assets/images'] // a list of input folder
  .forEach(dirname => (INPUT_DIRECTORIES = INPUT_DIRECTORIES.concat(getDirectoriesRecursive(dirname))));

try {
  (async () => {
    console.log(chalk.cyan(`### Image Compression Start`));

    for (let i in INPUT_DIRECTORIES) {
      const images = await imagemin([`${INPUT_DIRECTORIES[i]}/*.{jpg,png,svg,gif}`], INPUT_DIRECTORIES[i], {
        plugins: [
          //
          imageminMozjpeg(),
          imageminPngquant({ quality: '65-80' }),
          imageminSvgo({ removeViewBox: false })
        ]
      });

      images.forEach(file => console.log(file.path));
      console.log(chalk.green(`--- Finished image compression under ${INPUT_DIRECTORIES[i]} `));
    }

    console.log(chalk.cyan(`### Image Compression End`));
  })();
} catch (e) {
  console.log(e);
}
