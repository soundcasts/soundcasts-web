const {header, h1, h2} = require('@motorcycle/dom');

module.exports = (
  header('.header', [
    h1('Soundcasts'),
    h2('Turn SoundCloud profiles into podcasts.')
  ])
);
