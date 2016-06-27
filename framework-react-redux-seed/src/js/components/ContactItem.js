import React, {PropTypes,Component} from 'react';
import * as TodoActions from '../actions'

// 单个联系人视图
class ContactItemView extends Component{

    constructor(props, context) {
        super(props, context);
    };
    handleClick(){
        this.props.select(this.props.id);
    };
    render(){
        var style = {display:"block"},
            className = 'item';
        if (this.props.active) {
            className += ' active';
        }
        return (
            <div className={className} style={style} onClick={this.handleClick.bind(this)}>
                {this.props.username}
            </div>
        );
    };
}
ContactItemView.propTypes = {
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
export default ContactItemView;