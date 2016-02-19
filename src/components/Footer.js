import React from 'react';
import { createElement as r } from 'react';
import csjs from 'csjs';


export default class Footer extends React.Component {

  render() {
    let target = '_blank';

    let madeWith = 'Made with ୧༼ಠ益ಠ༽୨ by ';
    let l33tKr3w = r('a', { href: 'https://github.com/L33T-KR3W', target }, 'L33T KR3W');
    let separator = r('span', { className: styles.separator }, '·');
    let sourceCode = r('a', { href: 'https://github.com/L33T-KR3W/soundcasts-server', target }, 'Source code');

    return (
      r('div', { className: styles.footer },
        madeWith,
        l33tKr3w,
        separator,
        sourceCode
      )
    );
  }

}


const styles = csjs`

  .footer {
    margin-bottom: 50px;
    padding-top: 25px;
  }

  .separator {
    margin: 0 8px;
  }

`;
