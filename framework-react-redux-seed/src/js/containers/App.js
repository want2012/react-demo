import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import SidebarView from '../components/SiderBar';
import MainView from '../components/Main';

class App extends Component{
    render() {
        const { userinfo, actions,router} = this.props;
        return (
            <div className = "contacts">
                <SidebarView router={router} userinfo={userinfo} actions={actions}/>
                <div className = "vdivide"></div>
                <MainView router={router} userinfo={userinfo} actions={actions}/>
            </div>
        );
    };
}

App.propTypes = {
  userinfo: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.string.isRequired
}

function mapStateToProps(state) {

  const {
    todos: { userinfo,router }
  } = state

  return {
    userinfo: userinfo,
    router: router
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
