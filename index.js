const nyg = require('nyg');

const globs = [{ base: 'templates/' }];

const generator = nyg(null, globs).run();
