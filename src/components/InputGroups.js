import React from 'react';
import { createElement as r } from 'react';

import InputGroupWrapper from '../components/InputGroupWrapper';
import Input from '../components/Input';


class BaseInputGroup extends React.Component {

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
      r(InputGroupWrapper, null,
        r(Input, inputProps),
        r('span', null, description)
      )
    );
  }

}


export class UserIdInputGroup extends BaseInputGroup {

  render() {
    const { values, actions } = this.props;
    const inputProps = {
      value: values.userId,
      onChange: actions.editField.bind(null, 'userId'),
      type: 'text',
      placeholder: 'SoundCloud user_id',
      autoCorrect: 'off',
      autoCapitalize: 'none'
    };

    return (
      r(InputGroupWrapper, null,
        r(Input, inputProps),
        r('span', null, 'https://soundcloud.com/'),
        r('span', { className: 'red' }, values.userId || 'user_id')
      )
    );
  }

}


export class RegexStringInputGroup extends BaseInputGroup {

  render() {
    const { values, actions } = this.props;
    const inputProps = {
      value: values.regexString,
      onChange: actions.editField.bind(null, 'regexString'),
      type: 'text',
      placeholder: 'SoundCloud Regex Filter (Optional)',
      autoCorrect: 'off',
      autoCapitalize: 'none'
    };

    return (
      r(InputGroupWrapper, null,
        r(Input, inputProps),
        r('span', null, 'JavaScript case-insensitive regex filter applied against '),
        r('span', { className: 'red' }, values.userId || 'user_id'),
        r('span', null, '\'s track titles.')
      )
    );
  }

}


export class UrlInputGroup extends BaseInputGroup {

  render() {
    const { values, actions } = this.props;
    const inputProps = {
      value: values.url,
      onChange: actions.editField.bind(null, 'url'),
      id: 'url',
      type: 'text',
      placeholder: 'Soundcast URL',
      required: 'required'
    };
    const description = 'Copy and paste this link into your podcast player.';
    const opacity = values.url ? 1 : 0;

    return (
      r(InputGroupWrapper, null,
        r(Input, inputProps),
        r('span', { style: { opacity: opacity } }, description)
      )
    );
  }

}
