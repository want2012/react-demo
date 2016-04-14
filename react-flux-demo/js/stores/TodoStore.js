/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {
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
    active: false,
    username: 'lintao',
    email: 'lintao@163.com'
  }],
  router:'contacts'
};
var userinfo = _todos.userinfo;

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(data) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var name = data.username,
      email = data.email;

  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  userinfo.push({
    id: id,
    active: false,
    username: name,
    email: email
  });
}

function edit(){
    _todos['router'] = 'edit';
}

function add(){
    _todos['router'] = 'add';
}

function select(id){
  userinfo.forEach(function(elem){
    elem.active = false;
    if (elem.id == id) {
      elem.active = true;
    }
  });
  _todos['router'] = 'contacts';
}
/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  var user = {};
  for (var i = 0; i < userinfo.length; i++) {
    if (userinfo[i].id == id) {
       userinfo[i] = assign({}, userinfo[i], updates);
    }
  }
  //userinfo[id] = assign({}, userinfo[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}
*/

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  _todos.userinfo = userinfo.filter(function(res){
    return res.id != id;
  })
  userinfo = _todos.userinfo;
  //delete userinfo[id];
}

/**
 * Delete all the completed TODO items.

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}
 */

function search(query){
  var data = _todos.filter(function(obj){
    var flg = false;
    if (typeof(query) === 'undefined' || query === null || query === '') flg = true;
    query = query.toLowerCase();
    if(obj.username.toLowerCase().indexOf(query) != -1 || obj.email.toLowerCase().indexOf(query) != -1) flg = true;
    return flg == true;
  });
  return data;
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos.userinfo;
  },

  getActiveUser: function() {
    var actuser = userinfo.filter(function(res){
      return res.active == true;
    });
    if (actuser.length) {
      return actuser[0].id;
    } else {
      return '';
    }
  },

  getRouter: function() {
    return _todos.router;
  },

  getById: function(id) {
    return _todos[id];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      data = action.data;
      text = data.username.trim();
      if (text !== '') {
        create(data);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_SELECT:
      select(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_ADD:
      add();
      TodoStore.emitChange();
      break;
    //编辑
    case TodoConstants.TODO_EDIT:
      edit();
      TodoStore.emitChange();
      break;
    /*case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      TodoStore.emitChange();
      break;*/

    case TodoConstants.TODO_UPDATE_TEXT:
      if (action.data.username !== '') {
        update(action.id, action.data);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      console.log(action.id);
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_SEARCH:
      search(action.id);
      TodoStore.emitChange();
      break;

/*    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;*/

    default:
      // no op
  }
});

module.exports = TodoStore;
