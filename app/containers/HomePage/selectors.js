/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectOptionsSuccess = () =>
  createSelector(
    selectHome,
    homeState => homeState.data,
  );

const makeSelectOptionsLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.loading,
  );

const makeSelectOptionsError = () =>
  createSelector(
    selectHome,
    homeState => homeState.error,
  );

export {
  selectHome,
  makeSelectOptionsLoading,
  makeSelectOptionsSuccess,
  makeSelectOptionsError,
};
