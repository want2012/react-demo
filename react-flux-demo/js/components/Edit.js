
var React = require('react');
var TodoActions = require('../actions/TodoActions');

var EditView = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            email: '',
            id:''
        };
    },
    componentDidMount: function () {
        var newmap;
        if (typeof(this.props.userinfo) == 'undefined') {
            newmap = {
                username: '',
                email: '',
                id: ''
            };
        } else {
            var newmap = this.props.userinfo[0];
        }
        this.setState({
          username: newmap.username,
          email: newmap.email,
          id: newmap.id
        });
    },
    componentWillReceiveProps: function (nextProps) {
        var newmap;
        if (typeof(nextProps.userinfo) == 'undefined') {
            newmap = {
                username: '',
                email: '',
                id: ''
            };
        } else {
            newmap = nextProps.userinfo[0];
        }
        this.setState(newmap);
    },
    handleSave : function(){
        var data = this.state;
        console.log(data);
        if (data.id) {
            TodoActions.updateText(data.id, data);
        } else {
            TodoActions.create(data);
        }
        //this.props.callbackParent(data,"0");
    },
    handleDelete : function(){
        var data = this.state;
        TodoActions.destroy(data.id);
        //this.props.callbackParent(data,"1");
    },
    handleChange: function (event) {
        var name = event.target.name;
        var value = event.target.value;

        var newState = this.state;
        newState[name] = value;
        this.setState(newState);
    },
    render: function () {
        var self = this;
        return (
            <div className="active">
                <header>
                  <a className="save" onClick={this.handleSave}>保存</a>
                  <a className="delete" onClick={this.handleDelete}>删除</a>
                </header>
                <div className="content">
                    <form>
                        <label>
                          <span>姓名：</span>
                          <input type="text" name="username" value={self.state.username} onChange={self.handleChange}/>
                        </label>
                        <label>
                          <span>邮箱：</span>
                          <input type="email" name="email" value={self.state.email} onChange={self.handleChange}/>
                        </label>
                    </form>
                    <button onClick={this.handleSave} >保存</button>
                </div>
            </div>
        );
    }
});

module.exports = EditView;