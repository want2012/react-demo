
var React = require('react');
var TodoActions = require('../actions/TodoActions');
var SidebarView = require('./SiderBar');
var MainView = require('./Main');
var TodoStore = require('../stores/TodoStore');

function getTodoState() {
  return {
    userinfo: TodoStore.getAll(),
    activeuser: TodoStore.getActiveUser(),
    router: TodoStore.getRouter()
  };
}

var AppView = React.createClass({
    getInitialState: function () {
        return getTodoState();
    },

    componentDidMount: function () {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {router:"edit"}),
            '/edit': setState.bind(this, {router:"edit"}),
            '/contacts': setState.bind(this, {router:"contacts"}),
            '/add': setState.bind(this, {router:"add"})
        });
        router.init('/');
    },

    componentDidMount: function() {
      TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getTodoState());
    },

    render: function () {
        return (
            <div className = "contacts">
                <SidebarView userinfo={this.state.userinfo} activeuser={this.state.activeuser}/>
                <div className = "vdivide"></div>
                <MainView router={this.state.router} userinfo={this.state.userinfo} activeuser={this.state.activeuser}/>
            </div>
        );
    }
});

module.exports = AppView;