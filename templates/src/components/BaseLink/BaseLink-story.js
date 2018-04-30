import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import BaseLink from './BaseLink';

import { noop } from '../../util/basic-functions';

function generateImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#D46A6A';
  ctx.fillRect(100, 75, 200, 250);
  return canvas.toDataURL();
}

const links = [
  {
    className: 'external-link',
    text: 'External link',
    title: 'Go to Google',
    link: 'https://www.google.com',
    onClick: () => console.log('clicked')
  },
  {
    className: 'tel-link',
    text: 'Tel Link',
    title: 'Call +11111111111',
    link: 'tel:+11111111111'
  },
  {
    className: 'email-link',
    text: 'Email Link',
    title: 'Send a message to someone@yoursite.com',
    link: 'mailto:someone@yoursite.com'
  },
  {
    className: 'download-link',
    text: 'Download Image',
    title: 'Download rectangle.png',
    link: generateImage(),
    download: 'rectangle.png'
  }
];

storiesOf('BaseLink', module).add(
  'Basic Cases',
  withInfo(`
    BaseLink follows a very similar pattern to a standard html <a> tag, but it enforces additional
    best practices, like adding rel="noopener" whenever target="_blank". It also distinguishes 
    between basic <a> tag and react router's <Link> component.

    ~~~jsx
    // External link that opens in a new tab by default
    <BaseLink
      className="customized-anchor-tag"
      title="Link to nodejs main site"
      link="https://www.nodejs.org"
    >
      Visit nodejs.org
    </BaseLink>
    ~~~
    
    ~~~jsx
    // Section link via react router
    <BaseLink
      className="section-link"
      link="/about"
    >
      Visit odejs.org
    </BaseLink>
    ~~~
  `)(() => (
    <nav>
      <ul>
        {links.map((link, i) => (
          <li key={`li-${link.text}-${i}`}>
            <BaseLink
              title={link.title}
              className={link.className}
              key={`${link.text}-${i}`}
              link={link.link}
              target={link.target}
              onClick={link.onClick || noop}
              download={link.download}
            >
              {link.text}
            </BaseLink>
          </li>
        ))}
      </ul>
    </nav>
  ))
);
