import React from 'react';
import { createElement as r } from 'react';


export default class InputGroup extends React.Component {

  render() {
    return r('div', { className: 'input-group' }, this.props.children);
  }

}
