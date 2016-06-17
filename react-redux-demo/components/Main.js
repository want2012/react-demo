
import React, {Component} from 'react';
import * as TodoActions from '../actions'
import ShowView from './ContactInfo';
import EditView from './Edit';

class MainView extends Component{
    constructor(props, context) {
        super(props, context);
    };
    render() {
        var content,self = this;
        const {activeuser,actions} = this.props;
        var currentuser = this.props.userinfo.filter(function(obj){
            return obj.active == true;
        });

        if (this.props.router == 'contacts') {
            content = <ShowView userinfo={currentuser} edit={actions.edit}/>;
        } else if(this.props.router == 'edit'){
            content = <EditView userinfo={currentuser} {...actions}/>;
        } else  {
            content = <EditView {...actions}/>;
            //content = <ShowView userinfo={currentuser}/>;
        }
        return (
            <div className="main stack">
               {content}
            </div>
        );
    };
}
export default MainView;
