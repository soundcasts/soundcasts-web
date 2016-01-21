const {footer, a, span} = require('@motorcycle/dom');

module.exports = (
  footer('.footer', [
    'Made with ',
    span('୧༼ಠ益ಠ༽୨'),
    ' by ',
    a({attrs: {
      href: 'https://github.com/L33T-KR3W',
      target: '_blank'
    }}, 'L33T KR3W'),
    ' · ',
    a({attrs: {
      href: 'https://github.com/L33T-KR3W/soundcasts-server',
      target: '_blank'
    }}, 'Source code')
  ])
);
