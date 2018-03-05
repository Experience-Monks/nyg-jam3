import { isSupported, getBrowserInformation } from './unsupported-utils';

if (window.location.href.indexOf('unsupported') >= 0) {
  if (isSupported()) {
    window.location = '/';
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.log(getBrowserInformation());

      window.onload = function() {
        /* This information helps in the devices where is hard to see the console logs */
        const information = document.createElement('div');
        information.innerText = getBrowserInformation();
        document.body.appendChild(information);
      };
    }
  }
} else {
  if (!isSupported()) {
    window.location = '/unsupported.html';
  }
}
