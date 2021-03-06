/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import LOAD_OPTIONS from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  data: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_OPTIONS.INIT:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_OPTIONS.SUCCESS:
        draft.loading = false;
        draft.data = action.data;
        break;
      case LOAD_OPTIONS.ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
