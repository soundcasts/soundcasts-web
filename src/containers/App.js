import React from 'react';
import { createElement as r } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ValuesActions from '../actions/values';

import Header from '../components/Header';
import InputGroup from '../components/InputGroup';
import * as InputGroups from '../components/InputGroups';
import Input from '../components/Input';
import Footer from '../components/Footer';


class App extends React.Component {

  static propTypes = {
    values: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  render() {
    const { values, actions } = this.props;
    const inputGroupProps = { values, actions };


    let userIdInputProps = {
      value: values.userId,
      onChange: actions.editField.bind(null, 'userId'),
      type: 'text',
      placeholder: 'SoundCloud user_id',
      autoCorrect: 'off',
      autoCapitalize: 'none'
    };
    let userIdInputGroup = r(InputGroup, null,
      r(Input, userIdInputProps),
      r('span', null, 'https://soundcloud.com/'),
      r('span', { className: 'red' }, values.userId || 'user_id')
    );


    let regexStringInputProps = {
      value: values.regexString,
        onChange: actions.editField.bind(null, 'regexString'),
        type: 'text',
        placeholder: 'SoundCloud Regex Filter (Optional)',
        autoCorrect: 'off',
        autoCapitalize: 'none'
    };
    let regexStringInputGroup = r(InputGroup, null,
      r(Input, regexStringInputProps),
      r('span', null, 'JavaScript case-insensitive regex filter applied against '),
      r('span', { className: 'red' }, values.userId || 'user_id'),
      r('span', null, '\'s track titles.')
    );


    let urlInputProps = {
      value: values.url,
      onChange: actions.editField.bind(null, 'url'),
      id: 'url',
      type: 'text',
      placeholder: 'Soundcast URL',
      required: 'required'
    };
    let urlInputGroupDescription = 'Copy and paste this link into your podcast player.';
    let urlInputGroupDescriptionOpacity = values.url ? 1 : 0;
    let urlInputGroup = r(InputGroup, null,
      r(Input, urlInputProps),
      r('span', { style: { opacity: urlInputGroupDescriptionOpacity } }, urlInputGroupDescription)
    );


    return (
      r('div', null,
        r(Header),
        r(InputGroups.TitleInputGroup, inputGroupProps),
        userIdInputGroup,
        regexStringInputGroup,
        urlInputGroup,
        r(Footer)
      )
    );
  }

}


function mapStateToProps(state) {
  return {
    values: state.values
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ValuesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
