const {div, p, h1, h2} = require('@motorcycle/dom');

const header = div('.header', [
  h1('Soundcasts'),
  h2('Turn SoundCloud profiles into podcasts.')
]);

module.exports = header;
