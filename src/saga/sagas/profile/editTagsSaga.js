import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

import { updateTags } from '../../../redux/ducks/profile/editTags';
import { mergeTags } from '../../../redux/ducks/profile/profile';

import { getToken } from '../../../utils/auth';


function* updateTagsIterator({ payload }) {
  try {
    const token = yield call(getToken);
    const req = { tags: payload };
    const { data: { tags } } = yield call(axios.post, 'https://aag.secrettech.io/users/tags', req, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    yield call(console.log, tags);

    yield put(updateTags.success(tags));
    yield put(mergeTags(tags));
    yield put(NavigationActions.navigate({
      routeName: 'Profile',
      action: NavigationActions.navigate({
        routeName: 'ProfileEditProfile'
      })
    }));
  } catch (e) {
    yield call(console.log, e);
  }
}

function* updateTagsSaga() {
  yield takeLatest(
    updateTags.REQUEST,
    updateTagsIterator
  )
}


export default function* () {
  yield all([
    fork(updateTagsSaga)
  ]);
}
