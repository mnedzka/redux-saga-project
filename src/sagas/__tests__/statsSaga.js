import { runSaga } from 'redux-saga';

import { loadImageStats, setImageStats, setImageStatsError } from '../../actions';
import { handleStatsRequest } from '../statsSaga';
import * as api from '../../api'; // we'll mock the fetchImageStats api

test('should load and set the image stats in case of success', async () => {
  const dispatchedActions = [];
  const fakeId = '42';
  const fakeDownloads = 10;

  const mockedStats = { downloads: { total: fakeDownloads } };
  api.fetchImageStats = jest.fn(() => Promise.resolve(mockedStats));

  const fakeStore = {
    dispatch: action => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, handleStatsRequest, fakeId).done;

  expect(dispatchedActions).toContainEqual(loadImageStats(fakeId));
  expect(api.fetchImageStats.mock.calls.length).toBe(1);
  expect(dispatchedActions).toContainEqual(setImageStats(fakeId, fakeDownloads));
});
