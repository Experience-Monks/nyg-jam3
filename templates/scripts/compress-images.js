const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['watch']
});
const chokidar = require('chokidar');
const imagemin = require('imagemin');
const glob = require('glob');
const imageminJpegtran = require('imagemin-jpegtran')();
const imageminPngquant = require('imagemin-pngquant')({ quality: '65-80' });
const imageminGifsicle = require('imagemin-gifsicle')();
const imageminSvgo = require('imagemin-svgo')({ plugins: [{ removeViewBox: false }] });

const raw = 'assets-raw';
const cooked = 'assets';
const source = './src/';
const sourceGlob = `${source}**/*.+(jpg|png|svg|gif)`;

function compress(file) {
  if (file.startsWith(source)) {
    const dest = file.substr(0, file.lastIndexOf('/')).replace(`/${raw}`, `/${cooked}`);
    imagemin([file], dest, {
      plugins: [imageminJpegtran, imageminPngquant, imageminSvgo, imageminGifsicle]
    }).then(files => {
      files.forEach(function(file) {
        console.log('\x1b[36m%s\x1b[0m %s', '[COMPRESSED]', file.path);
      });
    });
  } else {
    const fix = `./${file}`;
    if (fix.startsWith(source)) {
      compress(fix);
    }
  }
}

glob(sourceGlob, {}, function(er, files) {
  files.filter(file => isCompressable(file)).forEach(compress);
});

function isCompressable(file) {
  const isInsideRawfolder = file.includes(`/${raw}/`);
  const isInsideCookedfolder = file.includes(`/${cooked}/`);
  if (!isInsideRawfolder && !isInsideCookedfolder) {
    const folder = file.substr(0, file.lastIndexOf('/'));
    const name = file.split('/').pop();
    console.log(
      '\x1b[33m%s\x1b[0m',
      `\n[WARNING] FILE WILL NOT BE COMPRESED!\nMOVE ${file}\nTO   ${folder}/${raw}/${name}\n`
    );
  }
  return isInsideRawfolder;
}

function filterAndCompress(file) {
  if (isCompressable(file)) {
    compress(file);
  }
}

if (argv.watch) {
  chokidar
    .watch(sourceGlob)
    .on('add', filterAndCompress)
    .on('change', filterAndCompress);
}
