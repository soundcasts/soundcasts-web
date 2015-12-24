import React from 'react';
import { createElement as r } from 'react';


export default class Header extends React.Component {

  render() {
    let title = r('p', { className: 'title' }, 'Soundcasts');
    let subtitle = r('p', { className: 'subtitle' }, 'Turn SoundCloud profiles into podcasts.');

    return (
      r('div', { className: 'header' },
        title,
        subtitle
      )
    );
  }

}
