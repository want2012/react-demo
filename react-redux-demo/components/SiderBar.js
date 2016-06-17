import React, { PropTypes, Component } from 'react';
import * as TodoActions from '../actions'
import ContactItemView from './ContactItem';

class SidebarView extends Component{

    constructor(props, context) {
        super(props, context);
        var newmap = this.props.userinfo;
        this.state = {
            userinfo:newmap
        };
    };
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let value = document.getElementById('search').value;
        let data = this.query(nextProps.userinfo,value);

        this.state = {
            userinfo:data
        };
    };
    handleEdit(){
        this.props.actions.add();
        //TodoActions.add();
    };
    query(data,key){
        let value = key.toLowerCase();

        return data.filter((obj)=>{
            var flg = false;
            if (typeof(value) === 'undefined' || value === null || value === '') flg = true;
            if(obj.username.toLowerCase().indexOf(value) != -1 || obj.email.toLowerCase().indexOf(value) != -1) flg = true;
            return flg == true;
        });
    };
    handleChange(event){
        let query = event.target.value;
        let data = this.query(this.props.userinfo,query);
        this.setState({userinfo:data});
    };
    render() {
        const actions = this.props.actions;
        return (
            <div className="sidebar">
                <header>
                  <input id='search' type="search" placeholder="搜索" results="0" incremental="true" autofocus onChange={this.handleChange.bind(this)}/>
                </header>
                <div className="items">
                {
                    this.state.userinfo.map((result) => {
                        return <ContactItemView key={result.id} username={result.username} id={result.id} active={result.active} select={actions.select}/>;
                    })
                }
                </div>
                <footer>
                  <button onClick={this.handleEdit.bind(this)}>新建联系人</button>
                </footer>
            </div>
        );
    };
}
SidebarView.propTypes = {
  userinfo: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}
export default SidebarView;
