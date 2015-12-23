import React from 'react';
import { createElement as r } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ValuesActions from '../actions/values';

import Footer from '../components/Footer';


class App extends React.Component {

  render() {
    const { values, actions } = this.props;
    let str = JSON.stringify(values);
    console.log({ values, actions });
    return (
      r('div', null,
        r('p', null, str),
        r('button', { onClick: this.handleEdit.bind(this) }, 'Title'),
        r(Footer)
      )
    );
  }

  handleEdit() {
    console.log(this);
    console.log(arguments);
    this.props.actions.editField('name', 'IANNN');
  }

}

App.propTypes = {
  values: React.PropTypes.object.isRequired
};


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
