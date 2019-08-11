import LOAD_DATA from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function getData() {
  return {
    type: LOAD_DATA.INIT,
  };
}

export function getDataSuccess(data) {
  return {
    type: LOAD_DATA.SUCCESS,
    data,
  };
}

export function getDataError(error) {
  return {
    type: LOAD_DATA.ERROR,
    error,
  };
}
