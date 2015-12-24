import React from 'react';
import { createElement as r } from 'react';

import InputGroup from '../components/InputGroup';
import Input from '../components/Input';


export class BaseInputGroup extends React.Component {

  static propTypes = {
    values: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  };

}


export class TitleInputGroup extends BaseInputGroup {

  render() {
    const { values, actions } = this.props;
    const inputProps = {
      value: values.title,
      onChange: actions.editField.bind(null, 'title'),
      type: 'text',
      placeholder: 'Soundcast Title'
    };
    const description = 'The title that will display in your podcast player.';

    return (
      r(InputGroup, null,
        r(Input, inputProps),
        r('span', null, description)
      )
    );
  }

}
