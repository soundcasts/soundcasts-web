import React from 'react';
import { createElement as r } from 'react';


export default class Footer extends React.Component {

  render() {
    let target = '_blank';

    let madeWith = 'Made with ୧༼ಠ益ಠ༽୨ by ';
    let l33tKr3w = r('a', { href: 'https://github.com/L33T-KR3W', target }, 'L33T KR3W');
    let separator = r('span', { className: 'separator' }, '·');
    let sourceCode = r('a', { href: 'https://github.com/L33T-KR3W/soundcasts-server', target }, 'Source code');

    return (
      r('div', { className: 'footer' },
        madeWith,
        l33tKr3w,
        separator,
        sourceCode
      )
    );
  }

}
