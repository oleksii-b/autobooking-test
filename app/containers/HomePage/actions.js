import LOAD_OPTIONS from './constants';

export function getOptions() {
  return {
    type: LOAD_OPTIONS.INIT,
  };
}

export function getOptionsSuccess(data) {
  return {
    type: LOAD_OPTIONS.SUCCESS,
    data,
  };
}

export function getOptionsError() {
  return {
    type: LOAD_OPTIONS.ERROR,
  };
}
