import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { PodcastQueryPayload } from 'common/types/types';
import { loadPodcasts, loadMorePodcasts } from './actions';

type State = {
  dataStatus: DataStatus;
  podcasts: PodcastQueryPayload;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcasts: {
    results: [],
    totalCount: 0,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcasts.pending, (state) => {
    state.podcasts = initialState.podcasts;
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcasts.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts = action.payload;
  });
  builder.addCase(loadPodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadMorePodcasts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadMorePodcasts.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts.results = state.podcasts.results.concat(action.payload.results);
  });
  builder.addCase(loadMorePodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
