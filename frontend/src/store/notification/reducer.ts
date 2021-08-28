import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserNotification } from 'common/types/types';
import { loadNotifications } from './actions';

type State = {
  dataStatus: DataStatus;
  notifications: UserNotification[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  notifications: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadNotifications.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadNotifications.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.notifications = action.payload;
  });
  builder.addCase(loadNotifications.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
