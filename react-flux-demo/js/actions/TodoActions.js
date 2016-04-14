/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {

  /**
   * @param  {string} text
   */
  create: function(data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      data: data
    });
  },

  select: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_SELECT,
      id: id
    });
  },

  add: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_ADD
    });
  },

  edit: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_EDIT
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, data) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT,
      id: id,
      data: data
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo

  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },
   */
  /**
   * Mark all ToDos as complete

  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },
   */
  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
 
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }
    */
  search: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_SEARCH,
      id: id
    });
  }

};

module.exports = TodoActions;
