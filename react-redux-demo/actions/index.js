import * as types from '../constants/ActionTypes'

export function create(data) {
  return { type: types.TODO_CREATE, data }
}

export function select(id) {
  return { type: types.TODO_SELECT, id}
}

export function add() {
  return { type: types.TODO_ADD }
}

export function edit() {
  return { type: types.TODO_EDIT }
}

export function updateText(id, data) {
  return { type: types.TODO_UPDATE_TEXT, id, data}
}

export function destroy(id) {
  return { type: types.TODO_DESTROY, id}
}

export function search(text) {
  return { type: types.TODO_SEARCH, text}
}
