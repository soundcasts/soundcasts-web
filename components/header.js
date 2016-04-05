const csjs = require('csjs-inject');
const {header, h1, h2} = require('@motorcycle/dom');

const styles = csjs`
  
  .title {
    font-size: 48px;
    font-weight: 600;
    letter-spacing: 0.1em;
    margin-bottom: 0;
    margin-left: 0.1em;
    text-transform: uppercase;
  }
  
  .subtitle {
    font-size: 18px;
    font-weight: 200;
    margin-top: 2px;
  }
  
  @media (max-width: 400px) {
    .title {
      font-size: 30px;
    }
    
    .subtitle {
      font-size: 16px;
    }
  }
  
`;

module.exports = (
  header([
    h1(styles.title.selector, 'Soundcasts'),
    h2(styles.subtitle.selector, 'Turn SoundCloud profiles into podcasts.')
  ])
);
