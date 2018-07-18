const https = require('https');
const querystring = require('querystring');
const argv = require('minimist')(process.argv.slice(2));

function call(path, data, cb) {
  if (!cb && typeof data === 'function') {
    cb = data;
    data = undefined;
  }
  var req = https.request(
    {
      host: 'graph.facebook.com',
      path: path,
      port: 443,
      method: data ? 'POST' : 'GET'
    },
    function(res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        data += chunk;
      });
      res.on('end', function() {
        if (cb) cb(data);
      });
    }
  );
  if (data) req.write(data);
  req.end();
}

var share = {};
try {
  share = require('../static/json/share.json');
} catch (err) {
  // required files that don't exist throw errors
}
if (!share) {
  try {
    share = require('../raw-assets/json/share.json');
  } catch (err) {
    // required files that don't exist throw errors
  }
}

if (argv.url) {
  if (process.env.FB_APP_ID && process.env.FB_APP_SECRET) {
    var url;
    if (argv.url.charAt(argv.url.length - 1) === '/') {
      url = encodeURIComponent(argv.url);
    } else {
      url = encodeURIComponent(argv.url + '/');
    }
    const opts = {
      client_id: process.env.FB_APP_ID,
      client_secret: process.env.FB_APP_SECRET,
      grant_type: 'client_credentials'
    };
    call(`/oauth/access_token?${querystring.stringify(opts)}`, function(data) {
      var token = data.replace('access_token=', '');
      call('/', 'id=' + url + '&scrape=true&access_token=' + token, function(data) {
        console.log('\x1b[32m CLEARED:', decodeURIComponent(url), '\x1b[0m');
      });
      Object.keys(share).forEach(function(cur, i) {
        if (cur != 'default') {
          setTimeout(function() {
            call('/', 'id=' + url + encodeURIComponent(cur) + '&scrape=true&access_token=' + token, function(data) {
              console.log('\x1b[32m CLEARED:', decodeURIComponent(url) + cur, '\x1b[0m');
            });
          }, (i + 1) * 500);
        }
      });
    });
  } else {
    console.log('\x1b[31m Please define a valid FB_APP_ID and FB_APP_SECRET in your environment variables\x1b[0m');
  }
} else {
  console.log('\x1b[31m Please provide a url in this format: npm run facebook -- --url=[YOUR URL]\x1b[0m');
}
