var React = require('react');
var TodoActions = require('../actions/TodoActions');
// 单个联系人视图
var ContactItemView = React.createClass({
    handleClick: function(){
        TodoActions.select(this.props.id);
    },
    render: function () {
        var style = {display:"block"},
            className = 'item';
        if (this.props.active) {
            className += ' active';
        }
        return (
            <div className={className} style={style} onClick={this.handleClick}>
                {this.props.username}
            </div>
        );
    }
});
module.exports = ContactItemView;