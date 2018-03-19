const sassdoc = require('sassdoc');

if (!process.env.GEN_DOC) {
  return;
}

// Generate SASS Mixin documentation
sassdoc('./src/style', { verbose: true, dest: './public/sassdoc' }).then(
  function() {
    console.log('Your documentation has been generated!');
  },
  function(err) {
    console.error(err);
  }
);
