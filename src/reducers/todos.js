import { REHYDRATE } from 'redux-persist/lib/constants';
import { handleActions } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const todosState = {
  todos: [],
};

export default {
  todos: handleActions(
    {
      // [REHYDRATE]: draft => {
      //   draft.todos = [];
      // },
      [ActionTypes.DELETE_TODO]: (draft, { payload: { id } }) => {
        draft.todos = draft.todos.filter(d => d.id !== id);
      },
      [ActionTypes.ADD_TODO]: (draft, { payload }) => {
        draft.todos.push(payload.query);
      },
      [ActionTypes.CHANGE_TODO]: (draft, { payload }) => {
        const { query } = payload;
        draft.todos = draft.todos.map(todo => {
          if (todo.id === query.id) {
            return query;
          }
          return todo;
        });
      },
    },
    todosState,
  ),
};
