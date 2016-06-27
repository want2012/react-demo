    
import React, {Component} from 'react';
import * as TodoActions from '../actions'

// 显示选择的联系人详细信息
class ShowView extends Component{

    constructor(props, context) {
        super(props, context);
    };
    handleEdit(){
        this.props.edit();
        //TodoActions.edit();
    };
    render() {
        var result = {};
        if (this.props.userinfo.length) {
            result = this.props.userinfo[0];
        }
        return (
            <div className='show active'>
                <header>
                  <a className="edit" onClick={this.handleEdit.bind(this)}>编辑</a>
                </header>
                <div className="content">
                    <p>姓名：{result.username}</p>
                    <p>邮箱：{result.email}</p>
                </div>
            </div>
        );
    };
}
export default ShowView;
