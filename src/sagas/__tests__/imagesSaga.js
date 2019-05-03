import { runSaga } from 'redux-saga';

import { getPage, handleImagesLoad } from '../imagesSaga';
import * as api from '../../api'; // we'll mock the fetchImages api
import { setImages, setError } from '../../actions';

test('selector should return the desired page', () => {
  const nextPage = 1;
  const state = { nextPage };
  const res = getPage(state);
  expect(res).toBe(nextPage);
});
