
import React, {Component} from 'react';
import * as TodoActions from '../actions'

class EditView extends Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            email: '',
            id:''
        };
    };
    componentDidMount(){
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
    };
    componentWillReceiveProps(nextProps){
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
    };
    handleSave(){
        var data = this.state;
        if (data.id) {
            this.props.updateText(data.id, data);
            //TodoActions.updateText(data.id, data);
        } else {
            this.props.create(data);
            //TodoActions.create(data);
        }
        //this.props.callbackParent(data,"0");
    };
    handleDelete(){
        var data = this.state;
        this.props.destroy(data.id);
        //this.props.callbackParent(data,"1");
    };
    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;

        var newState = this.state;
        newState[name] = value;
        this.setState(newState);
    };
    render() {
        var self = this;
        return (
            <div className="active">
                <header>
                  <a className="save" onClick={this.handleSave.bind(this)}>保存</a>
                  <a className="delete" onClick={this.handleDelete.bind(this)}>删除</a>
                </header>
                <div className="content">
                    <form>
                        <label>
                          <span>姓名：</span>
                          <input type="text" name="username" value={self.state.username} onChange={self.handleChange.bind(this)}/>
                        </label>
                        <label>
                          <span>邮箱：</span>
                          <input type="email" name="email" value={self.state.email} onChange={self.handleChange.bind(this)}/>
                        </label>
                    </form>
                    <button onClick={this.handleSave.bind(this)} >保存</button>
                </div>
            </div>
        );
    }
}
export default EditView;
