/**
 * @module Sagas/Todos
 * @desc Todos
 */

import { all, delay, put, select, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';

/**
 * AddTodo
 */
export function* addTodo({ payload }) {
  try {
    const repos = yield select(state => state.todos.todos);

    /* istanbul ignore else */
    let payload;
    if (!repos.data[payload.query] || !repos.data[payload.query].length) {
      yield put({
        type: ActionTypes.GITHUB_GET_REPOS,
        payload,
      });
    }
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.EXCEPTION,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(ActionTypes.ADD_TODO, addTodo),
    // takeLatest(ActionTypes.USER_LOGOUT, logout),
  ]);
}
