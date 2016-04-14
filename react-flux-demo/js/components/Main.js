
var React = require('react');
var TodoActions = require('../actions/TodoActions');
var ShowView = require('./ContactInfo');
var EditView = require('./Edit');

var MainView = React.createClass({
    render: function () {
        var content,self = this;
        var currentuser = this.props.userinfo.filter(function(obj){
            return obj.id == self.props.activeuser;
        });

        if (this.props.router == 'contacts') {
            content = <ShowView userinfo={currentuser}/>;
        } else if(this.props.router == 'edit'){
            content = <EditView userinfo={currentuser}/>;
        } else  {
            content = <EditView />;
            //content = <ShowView userinfo={currentuser}/>;
        }
        return (
            <div className="main stack">
               {content}
            </div>
        );
    }
});
module.exports = MainView;