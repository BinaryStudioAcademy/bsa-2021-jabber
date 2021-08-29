import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { Podcast, User } from 'common/types/types';
import { loadPodcasts, loadUser, getFollowersCount, checkIsFollowedUser, toggleFollowUser, loadFollowersByUserId } from './actions';

type State = {
  dataStatus: DataStatus;
  followersDataStatus: DataStatus;
  podcasts: Podcast[];
  user: User | null;
  isFollowed: boolean;
  followersCount: number;
  followers: User[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  followersDataStatus: DataStatus.IDLE,
  podcasts: [],
  user: null,
  isFollowed: false,
  followersCount: 0,
  followers: [],
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
  builder.addCase(checkIsFollowedUser.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkIsFollowedUser.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.isFollowed = action.payload;
  });
  builder.addCase(checkIsFollowedUser.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(toggleFollowUser.fulfilled, (state, action) => {
    state.isFollowed = action.payload;

    action.payload ? state.followersCount++ : state.followersCount--;
  });

  builder.addCase(loadFollowersByUserId.pending, (state) => {
    state.followersDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadFollowersByUserId.fulfilled, (state, action) => {
    state.followersDataStatus = DataStatus.FULFILLED;
    state.followers = action.payload;
  });
  builder.addCase(loadFollowersByUserId.rejected, (state) => {
    state.followersDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
