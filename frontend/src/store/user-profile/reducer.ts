import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, User } from 'common/types/types';
import { loadPodcasts, loadUser, updateUser } from './actions';

type State = {
  dataStatus: DataStatus;
  podcasts: Podcast[];
  user: User | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcasts: [],
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadPodcasts.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadPodcasts.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.podcasts = action.payload;
  });
  builder.addCase(loadPodcasts.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(loadUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(loadUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(updateUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(updateUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.user = action.payload;
  });
  builder.addCase(updateUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
