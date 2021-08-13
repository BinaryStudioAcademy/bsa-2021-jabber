import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserNotification } from 'common/types/types';
import { loadNotification } from './actions';

type State = {
  dataStatus: DataStatus;
  notifications: UserNotification[] | UserNotification | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  notifications: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadNotification.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadNotification.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.notifications = [];
  });
  builder.addCase(loadNotification.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
