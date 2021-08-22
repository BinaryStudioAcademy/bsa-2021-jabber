import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, User } from 'common/types/types';
import { loadPodcasts, loadUser, isFollowedUser, followUser, unfollowUser } from './actions';

type State = {
  dataStatus: DataStatus;
  podcasts: Podcast[];
  user: User | null;
  isFollowed: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  podcasts: [],
  user: null,
  isFollowed: false,
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
  builder.addCase(isFollowedUser.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(isFollowedUser.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.isFollowed = action.payload;
  });
  builder.addCase(isFollowedUser.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(followUser.fulfilled, (state) => {
    state.isFollowed = true;
  });
  builder.addCase(unfollowUser.fulfilled, (state) => {
    state.isFollowed = false;
  });
});

export { reducer };
