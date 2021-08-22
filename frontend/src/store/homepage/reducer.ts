import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast } from 'common/types/types';
import { loadPodcasts, loadMorePodcasts } from './actions';

type State = {
  dataStatus: DataStatus;
  podcasts: Podcast[];
  podcastsTotalCount: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcasts: [],
  podcastsTotalCount: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcasts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcasts.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts = action.payload.results;
    state.podcastsTotalCount = action.payload.totalCount;
  });
  builder.addCase(loadPodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(loadMorePodcasts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadMorePodcasts.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts = state.podcasts.concat(action.payload.results);
    state.podcastsTotalCount = action.payload.totalCount;
  });
  builder.addCase(loadMorePodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
