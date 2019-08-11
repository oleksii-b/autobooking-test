import { all, call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import LOAD_OPTIONS from './constants';
import { getOptionsSuccess, getOptionsError } from './actions';

export function* getOptions() {
  try {
    const requestURL = 'https://beta.autobooking.com/api/test/v1/search';
    const [services, brands, styles] = yield all([
      call(request, `${requestURL}/terms`),
      call(request, `${requestURL}/brands_terms`),
      call(request, `${requestURL}/styles`),
    ]);
    yield put(
      getOptionsSuccess({
        services: services.data,
        brands: brands.data,
        styles: styles.data,
      }),
    );
  } catch (err) {
    yield put(getOptionsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* apiSaga() {
  yield takeLatest(LOAD_OPTIONS.INIT, getOptions);
}
