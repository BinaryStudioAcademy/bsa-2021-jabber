import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast } from 'common/types/types';
import { postPodcast } from './actions';

type State = {
  dataStatus: DataStatus;
  podcast: Podcast | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcast: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(postPodcast.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(postPodcast.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(postPodcast.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
