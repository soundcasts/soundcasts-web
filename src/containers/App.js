import React from 'react';
import { createElement as r } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ValuesActions from '../actions/values';

import Header from '../components/Header';
import InputGroupWrapper from '../components/InputGroupWrapper';
import * as InputGroups from '../components/InputGroups';
import Input from '../components/Input';
import Footer from '../components/Footer';


class App extends React.Component {

  static propTypes = {
    values: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  };

  render() {
    const inputGroupProps = {
      values: this.props.values,
      actions: this.props.actions
    };

    return (
      r('div', null,
        r(Header),
        r(InputGroups.TitleInputGroup, inputGroupProps),
        r(InputGroups.UserIdInputGroup, inputGroupProps),
        r(InputGroups.RegexStringInputGroup, inputGroupProps),
        r(InputGroups.UrlInputGroup, inputGroupProps),
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
