import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserNotification } from 'common/types/types';
import { loadCurrentUserNotifications, changeStatus, getCountUncheckedUserNotifications } from './actions';

type State = {
  dataStatus: DataStatus;
  notificationsDataStatus: DataStatus;
  notifications: UserNotification[];
  countUncheckedNotification: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  notificationsDataStatus: DataStatus.IDLE,
  notifications: [],
  countUncheckedNotification: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadCurrentUserNotifications.pending, (state) => {
    state.notificationsDataStatus = DataStatus.PENDING;
  });
  builder.addCase(loadCurrentUserNotifications.fulfilled, (state, action) => {
    state.notificationsDataStatus = DataStatus.FULFILLED;
    state.notifications = action.payload;
  });
  builder.addCase(loadCurrentUserNotifications.rejected, (state) => {
    state.notificationsDataStatus = DataStatus.REJECTED;
  });
  builder.addCase(getCountUncheckedUserNotifications.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getCountUncheckedUserNotifications.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.countUncheckedNotification = action.payload;
  });
  builder.addCase(getCountUncheckedUserNotifications.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
  builder.addCase(changeStatus.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(changeStatus.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.notifications = state.notifications.map((notification) => {
      if (notification.id === action.payload.id) {
        return action.payload;
      }
      return notification;
    });
  });
  builder.addCase(changeStatus.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
