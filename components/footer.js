const csjs = require('csjs-inject');
const {footer, a, span} = require('@motorcycle/dom');

const styles = csjs`
  
  .footer {
    margin: 20px 0;
  }
  
`;

module.exports = footer(styles.footer.selector, [
  'Made with ',
  '🍺', // beer mug
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
]);
