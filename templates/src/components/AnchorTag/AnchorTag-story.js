import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import AnchorTag from './AnchorTag';

const links = [
  {
    className: 'google-link',
    text: 'Google',
    title: 'Go to Google',
    href: 'https://www.google.com'
  },
  {
    className: 'facebook-link',
    text: 'Facebook',
    title: 'Go to facebook',
    href: 'https://www.facebook.com'
  }
];

storiesOf('AnchorTag', module)
  .add(
    'Basic Usage',
    withInfo(`
    AnchorTag follows a very similar pattern to a standard html <a> tag, but it enforces additional
    best practices, like adding rel="noopener noreferrer" whenever target="_blank"

    ~~~jsx
    <AnchorTag
      title="Link to nodejs main site"
      className="customized-anchor-tag"
      target="_blank"
      href="https://www.nodejs.org"
    >
      Visit nodejs.org
    </AnchorTag>
    ~~~
  `)(() => (
      <nav>
        <ul>
          {links.map((link, i) => (
            <li key={`li-${link.text}-${i}`}>
              <AnchorTag
                title={link.title}
                className={link.className}
                key={`${link.text}-${i}`}
                href={link.href}
                target="_blank"
              >
                {link.text}
              </AnchorTag>
            </li>
          ))}
        </ul>
      </nav>
    ))
  )
  .add(
    'Download image from canvas',
    withInfo(
      `
    An example where you want to download an image directly from canvas
    
    ~~~js
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#D46A6A';
    ctx.fillRect(100, 75, 200, 250);
    const base64 = canvas.toDataURL();

    <div>
      {
        <AnchorTag title="Download Image" href={base64} download="boring-rectangle.png">
          Download Boring Rectangle
        </AnchorTag>
      }
    </div>
    ~~~
  `
    )(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#D46A6A';
      ctx.fillRect(100, 75, 200, 250);
      const base64 = canvas.toDataURL();

      return (
        <div>
          {
            <AnchorTag title="Download Image" href={base64} download="boring-rectangle.png">
              Download Boring Rectangle
            </AnchorTag>
          }
        </div>
      );
    })
  );
