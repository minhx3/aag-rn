import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import axios from 'axios';

import { fetchSubAdvisors } from '../../../redux/ducks/explore/subExplore';

import { getToken } from '../../../utils/auth';


function* fetchSubAdvisorsIterator({ payload }) {
  try {
    const token = yield call(getToken);
    const { data: { data } } = yield call(axios.get, `https://aag.secrettech.io/explorer/${payload}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield put(fetchSubAdvisors.success(data));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* fetchSubAdvisorsSaga() {
  yield takeLatest(
    fetchSubAdvisors.REQUEST,
    fetchSubAdvisorsIterator
  )
}


export default function* () {
  yield all([
    fork(fetchSubAdvisorsSaga)
  ]);
}
