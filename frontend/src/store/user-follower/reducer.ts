import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserFollower } from 'common/types/types';
import { loadFollowersByUserId } from './actions';

type State = {
  dataStatus: DataStatus;
  followersDataStatus: DataStatus;
  followers: UserFollower[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  followersDataStatus: DataStatus.IDLE,
  followers: [],
};

const reducer = createReducer(initialState, (builder) => {
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
