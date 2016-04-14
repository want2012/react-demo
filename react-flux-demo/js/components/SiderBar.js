    
var React = require('react');
var TodoActions = require('../actions/TodoActions');
var ContactItemView = require('./ContactItem');

// 左边的侧边条视图
var SidebarView = React.createClass({
    getInitialState: function () {
        var newmap = this.props.userinfo;
        return {
            userinfo:newmap
        };
    },
    componentWillReceiveProps: function (nextProps) {
        var newmap = nextProps.userinfo;
        this.setState({userinfo:newmap});
    },
    handleEdit : function(){
        TodoActions.add();
    },
    handleChange: function(event){
        var query = event.target.value;
        var data = this.props.userinfo;
        var self = this;
        data = data.filter(function(obj){
            var flg = false;
            if (typeof(query) === 'undefined' || query === null || query === '') flg = true;
            query = query.toLowerCase();
            if(obj.username.toLowerCase().indexOf(query) != -1 || obj.email.toLowerCase().indexOf(query) != -1) flg = true;
            return flg == true;
        });
        this.setState({userinfo:data});
    },
    render: function () {
        var self = this,
            activeuser = self.props.activeuser;

        return (
            <div className="sidebar">
                <header>
                  <input type="search" placeholder="搜索" results="0" incremental="true" autofocus onChange={this.handleChange}/>
                </header>
                <div className="items">
                {
                    this.state.userinfo.map(function(result) {
                        return <ContactItemView username={result.username} active={activeuser == result.id} id={result.id}/>;
                    })
                }
                </div>
                <footer>
                  <button onClick={this.handleEdit}>新建联系人</button>
                </footer>
            </div>
        );
    }
});

module.exports = SidebarView;