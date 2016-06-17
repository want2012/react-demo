import {TODO_CREATE,TODO_DESTROY,TODO_UPDATE_TEXT,TODO_SEARCH,TODO_ADD,TODO_SELECT,TODO_EDIT } from '../constants/ActionTypes'

const initialState = 
{
  userinfo:[{
    id: '11111',
    active: false,
    username: 'Lilei',
    email: 'Lilei@163.com'
  },
  {
    id: '11112',
    active: false,
    username: 'hanmeimei',
    email: 'hanmeimei@163.com'
  },
  {
    id: '11113',
    active: true,
    username: 'lintao',
    email: 'lintao@163.com'
  }],
  router:'/'
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case TODO_CREATE:
      var  data = action.data;
      var text = data.username.trim();
      let arr = state.userinfo.concat();
      arr.forEach((item,index)=>{
        item.active=false;
      });
      return {
        userinfo:[ 
        ...arr,
        {
            id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
            active: true,
            username: text,
            email: data.email
        }
        ],
        router:'edit'
      }

    case TODO_SELECT:
      let newuserinfo = state.userinfo.concat();
      let id = action.id;
      newuserinfo.forEach((elem)=>{
        elem.active = false;
        if (elem.id == id) {
          elem.active = true;
        }
      });
      return {
          userinfo:newuserinfo,
          router:'contacts'
        }

    case TODO_ADD:
      return Object.assign({},state,{router:'/'});

    case TODO_EDIT:
      return Object.assign({},state,{router:'edit'});

    case TODO_UPDATE_TEXT:
      let newuserinfo2 = state.userinfo.concat();
      for (var i = 0; i < newuserinfo2.length; i++) {
        if (newuserinfo2[i].id == action.id) {
            newuserinfo2[i] = Object.assign({}, newuserinfo2[i], action.data);
        }
      }
      return {
        userinfo:newuserinfo2,
        router:'edit'
      }

    case TODO_DESTROY:
      let newuserinfo3 = state.userinfo.concat().filter(el=>{return el.id != action.id;});
      return {
        userinfo:newuserinfo3,
        router:'/'
      }

     case TODO_SEARCH:
        let query = action.text.toLowerCase();
        let newuserinfo4 = state.userinfo.concat().filter((obj)=>{
            let flg = false;
            if (typeof(query) === 'undefined' || query === null || query === '') flg = true;
            if(obj.username.toLowerCase().indexOf(query) != -1) flg = true;
            return flg == true;
        });
      return {
        userinfo:newuserinfo4,
        router:state.router
      }

    default:
      return state
  }
}
