import React from 'react';
import { createElement as r } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import csjs from 'csjs';

import * as ValuesActions from '../actions/values';

import Header from '../components/Header';
import InputGroupWrapper from '../components/InputGroupWrapper';
import * as InputGroups from '../components/InputGroups';
import Input from '../components/Input';
import Footer from '../components/Footer';
import * as style from '../styles/constants';


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
      r('div', { className: styles.flexContainer },
        r('div', { className: styles.innerContainer },
          r(Header),
          r(InputGroups.TitleInputGroup, inputGroupProps),
          r(InputGroups.UserIdInputGroup, inputGroupProps),
          r(InputGroups.RegexStringInputGroup, inputGroupProps),
          r(InputGroups.UrlInputGroup, inputGroupProps),
          r(Footer)
        )
      )
    );
  }

}


const styles = csjs`

  body {
    background: ${style.backk};
  }

  .flexContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;

    font-family: 'Lato', sans-serif;
    color: #fdfcfb;
    background: #f8a434;
    text-align: center;
  }

  .innerContainer {
    width: 100%;
    max-width: 700px;
  }

`;


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
