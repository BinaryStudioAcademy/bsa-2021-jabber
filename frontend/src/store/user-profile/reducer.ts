import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, User } from 'common/types/types';
import { loadPodcasts, loadUser, getFollowersCount, isFollowedUser, followUser, unfollowUser } from './actions';

type State = {
  dataStatus: DataStatus;
  followersDataStatus: DataStatus;
  podcasts: Podcast[];
  user: User | null;
  isFollowed: boolean;
  followersCount: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  followersDataStatus: DataStatus.IDLE,
  podcasts: [],
  user: null,
  isFollowed: false,
  followersCount: 0,
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
  builder.addCase(getFollowersCount.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getFollowersCount.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.followersCount = action.payload;
  });
  builder.addCase(getFollowersCount.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(isFollowedUser.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(isFollowedUser.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.isFollowed = action.payload;
  });
  builder.addCase(isFollowedUser.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(followUser.fulfilled, (state) => {
    state.isFollowed = true;
    state.followersCount++;
  });
  builder.addCase(unfollowUser.fulfilled, (state) => {
    state.isFollowed = false;
    state.followersCount--;
  });
});

export { reducer };
