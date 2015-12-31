const {div, p} = require('@motorcycle/dom');

const header = div('.header', [
  p('.title', 'Soundcasts'),
  p('.subtitle', 'Turn SoundCloud profiles into podcasts.')
]);

module.exports = header;
