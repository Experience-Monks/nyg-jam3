import sanitizer from '../sanitizer';

describe('Sanitizer: Malicious attributes', () => {
  test('data attribute', () => {
    // prettier-ignore
    expect(sanitizer('<a data-bind="style: alert(1)"></a>')).toBe('<a data-bind=\"style: alert(1)\"></a>');
  });

  test('img onerror attribute', () => {
    // prettier-ignore
    expect(sanitizer('<img src=x onerror=alert(1)>')).toBe('<img src=\"x\">');
  });

  test('svg onload attribute', () => {
    // prettier-ignore
    expect(sanitizer('<svg><g/onload=alert(2)//<p>')).toBe('<svg><g></g></svg>');
  });

  test('iframe src attribute', () => {
    // prettier-ignore
    expect(sanitizer('<p>abc<iframe/\/src=jAva&Tab;script:alert(3)>def')).toBe('<p>abcdef</p>');
  });

  test('math xlink attribute', () => {
    // prettier-ignore
    expect(sanitizer('<math><mi//xlink:href="data:x,<script>alert(4)</script>">')).toBe('<math><mi></mi></math>');
  });
});

describe('Sanitizer: Malicious content', () => {
  test('script attribute', () => {
    // prettier-ignore
    expect(sanitizer('<p><span><script>window.alert=function(){top.xssed=true;}</script>')).toBe('<p><span></span></p>');
  });
});
