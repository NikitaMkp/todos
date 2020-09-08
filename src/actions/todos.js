// @flow
/**
 * @module Actions/App
 * @desc App Actions
 */

import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { addTodo, deleteTodo, changeTodo } = createActions({
  [ActionTypes.ADD_TODO]: (query: Array) => ({ query }),
  [ActionTypes.DELETE_TODO]: (id: string) => ({ id }),
  [ActionTypes.CHANGE_TODO]: (query: Object) => ({ query }),
});
