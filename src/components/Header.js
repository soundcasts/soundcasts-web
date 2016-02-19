import React from 'react';
import { createElement as r } from 'react';
import csjs from 'csjs';


export default class Header extends React.Component {

  render() {
    let title = r('p', { className: styles.title }, 'Soundcasts');
    let subtitle = r('p', { className: styles.subtitle }, 'Turn SoundCloud profiles into podcasts.');

    return (
      r('div', { className: styles.header },
        title,
        subtitle
      )
    );
  }

}


const styles = csjs`

  .header {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .title {
    font-size: 45px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 18px;
    font-weight: 300;
  }

`;
