const csjs = require('csjs-inject');
const {header, h1, h2} = require('@motorcycle/dom');

const styles = csjs`
  
  .title {
    font-size: 48px;
    font-weight: 400;
    letter-spacing: 0.2em;
    margin-bottom: 0;
    margin-left: 0.1em;
    text-transform: uppercase;
  }
  
  .subtitle {
    font-size: 18px;
    font-weight: 200;
    margin-top: 2px;
  }
  
`;

module.exports = (
  header([
    h1(styles.title.selector, 'Soundcasts'),
    h2(styles.subtitle.selector, 'Turn SoundCloud profiles into podcasts.')
  ])
);
