const {div, a, span} = require('@motorcycle/dom');

const footer = div('.footer', [
  'Made with ୧༼ಠ益ಠ༽୨ by ',
  a({attrs: {
    href: 'https://github.com/L33T-KR3W',
    target: '_blank'
  }}, 'L33T KR3W'),
  span('.separator', '·'),
  a({attrs: {
    href: 'https://github.com/L33T-KR3W/soundcasts-server',
    target: '_blank'
  }}, 'Source code')
]);

module.exports = footer;
