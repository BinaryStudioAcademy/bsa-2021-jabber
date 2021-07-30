import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast } from 'common/types/types';
import { loadPodcasts } from './actions';

type State = {
  dataStatus: DataStatus;
  podcasts: Podcast[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcasts: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcasts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcasts.fulfilled, (state, action) => {
    const { podcasts } = action.payload;

    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts = podcasts;
  });
  builder.addCase(loadPodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
