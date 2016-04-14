    
var React = require('react');
var TodoActions = require('../actions/TodoActions');
// 显示选择的联系人详细信息
var ShowView = React.createClass({
    handleEdit : function(){
        TodoActions.edit();
    },
    render: function () {
        var result = {};
        if (this.props.userinfo.length) {
            result = this.props.userinfo[0];
        }
        return (
            <div className='show active'>
                <header>
                  <a className="edit" onClick={this.handleEdit}>编辑</a>
                </header>
                <div className="content">
                    <p>姓名：{result.username}</p>
                    <p>邮箱：{result.email}</p>
                </div>
            </div>
        );
    }
});

module.exports = ShowView;