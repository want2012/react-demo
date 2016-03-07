(function() {

    // 单个联系人视图
    var ContactItemView = React.createClass({
        handleClick: function(){
            this.props.onChoose(this.props.username);
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
            if (newmap.length) {
                this.setState({userinfo:newmap});
            }
        },
        handleEdit : function(){
            window.location.href='#/add';
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
                            return <ContactItemView username={result.username} active={activeuser == result.username} onChoose={self.props.onChoose}/>;
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

    // 显示选择的联系人详细信息
    var ShowView = React.createClass({
        handleEdit : function(){
            window.location.href='#/edit';
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

    // 编辑选择的联系人
    var EditView = React.createClass({
        getInitialState: function () {
            return {
                username: '',
                email: ''
            };
        },
        componentDidMount: function () {
            var newmap;
            if (typeof(this.props.userinfo) == 'undefined') {
                newmap = {
                    username: '',
                    email: ''
                };
            } else {
                var newmap = this.props.userinfo[0];
            }
            this.setState({
              username: newmap.username,
              email: newmap.email
            });
        },
        componentWillReceiveProps: function (nextProps) {
            var newmap;
            if (typeof(nextProps.userinfo) == 'undefined') {
                newmap = {
                    username: '',
                    email: ''
                };
            } else {
                newmap = nextProps.userinfo[0];
            }
            this.setState(newmap);
        },
        handleSave : function(){
            var data = this.state;
            this.props.callbackParent(data,"0");
        },
        handleDelete : function(){
            var data = this.state;
            this.props.callbackParent(data,"1");
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

    var MainView = React.createClass({
        render: function () {
            var content,self = this;
            var currentuser = this.props.userinfo.filter(function(obj){
                return obj.username == self.props.activeuser;
            });
            if (this.props.router == 'contacts') {
                content = <ShowView userinfo={currentuser}/>;
            } else if(this.props.router == 'edit'){
                content = <EditView callbackParent={this.props.onEdit}  userinfo={currentuser}/>;
            } else if (this.props.router == 'add') {
                content = <EditView callbackParent={this.props.onEdit} />;
            }
            return (
                <div className="main stack">
                   {content}
                </div>
            );
        }
    });

    var AppView = React.createClass({
        handleChange: function (data, flg) {
            var name = data.username;
            var value = data.email;
            
            // 增加或者修改
            if (flg == '0') {
                var tmparr = this.state.userinfo.filter(function(obj){
                    return obj.username == name;
                });
                if (tmparr.length) {
                    this.state.userinfo.map(function(obj){
                        if (obj.username == name) {
                            obj.email = value;
                        }
                    });
                } else {
                    this.state.userinfo = this.state.userinfo.concat(data);
                }
                
            // 删除
            } else if (flg == '1') {
                this.state.userinfo = this.state.userinfo.filter(function(obj){
                    return (obj.username != name);
                });
            }

            app.Utils.store("userinfo",this.state.userinfo);
            this.setState(this.state);
        },
        handleChoose: function(data){
            var newState = this.state;
            newState["activeuser"] = data;
            this.setState(newState);
            window.location.href='#/contacts';
        },
        getInitialState: function () {
            //获取数据
            //var userinfo = app.Utils.store("userinfo");
            //this.setState({'userinfo':userinfo});
            /*var userinfo = [
                {
                    username:'aaa',
                    email:'1231321'
                },
                {
                    username:'bbb',
                    email:'1231321'
                },
                {
                    username:'ccc',
                    email:'1231321'
                }
            ];
            app.Utils.store("userinfo",userinfo);*/

            return {
                router:"contacts",
                activeuser:"",
                userinfo:[]
            };
        },
        componentDidMount: function () {
            var setState = this.setState;
            var router = Router({
                '/': setState.bind(this, {router:"add"}),
                '/edit': setState.bind(this, {router:"edit"}),
                '/contacts': setState.bind(this, {router:"contacts"}),
                '/add': setState.bind(this, {router:"add"})
            });
            router.init('/');

            // //获取数据
            var userinfo = app.Utils.store("userinfo");
            this.setState({'userinfo':userinfo});
        },
        render: function () {
            var newmap = this.state.userinfo;
            return (
                <div className = "contacts">
                    <SidebarView userinfo={this.state.userinfo} onChoose={this.handleChoose} activeuser={this.state.activeuser}/>
                    <div className = "vdivide"></div>
                    <MainView router={this.state.router} userinfo={this.state.userinfo} onEdit={this.handleChange} activeuser={this.state.activeuser}/>
                </div>
            );
        }
    });

    React.render(
        <AppView/>,
        document.getElementById('article')
    );


  })();
