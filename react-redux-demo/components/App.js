
import React, {Component} from 'react';
import SidebarView from './SiderBar';
import MainView from './Main';
import TodoStore from '../stores/TodoStore';

function getTodoState() {
  return {
    userinfo: TodoStore.getAll(),
    activeuser: TodoStore.getActiveUser(),
    router: TodoStore.getRouter()
  };
}

class AppView extends Component{

    constructor(props, context) {
      super(props, context);
      this.state = getTodoState();
    };

    componentDidMount() {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {router:"edit"}),
            '/edit': setState.bind(this, {router:"edit"}),
            '/contacts': setState.bind(this, {router:"contacts"}),
            '/add': setState.bind(this, {router:"add"})
        });
        router.init('/');
    };

    componentDidMount(){
      TodoStore.addChangeListener(this._onChange);
    };

    componentWillUnmount() {
      TodoStore.removeChangeListener(this._onChange);
    };

    _onChange() {
        this.setState(getTodoState());
    };

    render() {
        return (
            <div className = "contacts">
                <SidebarView userinfo={this.state.userinfo} activeuser={this.state.activeuser}/>
                <div className = "vdivide"></div>
                <MainView router={this.state.router} userinfo={this.state.userinfo} activeuser={this.state.activeuser}/>
            </div>
        );
    };
}
export default AppView;