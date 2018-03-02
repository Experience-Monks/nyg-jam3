const nyg = require('nyg');
const exec = require('child_process').exec;

// Generator configuration
const globs = [{ base: 'templates/' }];

const generator = nyg(null, globs)
  .on('postinstall', onPostInstall)
  .run();

/**
 * Post Install event
 */
function onPostInstall() {
  var done = generator.async();
  updateNvmVersion(done);
}

/**
 * Update NVM lock version with the current user sections
 *
 * @param {any} done - Generator asynchronous callback
 */
function updateNvmVersion(done) {
  exec(`node -v > ${generator.cwd}/.nvmrc`, function(err, stdout, stderr) {
    done();
  });
}
