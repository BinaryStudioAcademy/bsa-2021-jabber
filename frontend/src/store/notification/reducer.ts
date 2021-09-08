import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { UserNotification } from 'common/types/types';
import { loadCurrentUserNotifications, changeStatus } from './actions';

type State = {
  notificationsDataStatus: DataStatus;
  changeStatusDataStatus: DataStatus;
  notifications: UserNotification[];
};

const initialState: State = {
  notificationsDataStatus: DataStatus.IDLE,
  changeStatusDataStatus: DataStatus.IDLE,
  notifications: [],
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
  builder.addCase(changeStatus.pending, (state) => {
    state.changeStatusDataStatus = DataStatus.PENDING;
  });
  builder.addCase(changeStatus.fulfilled, (state, action) => {
    state.changeStatusDataStatus = DataStatus.FULFILLED;
    state.notifications = state.notifications.map((notification) => {
      if (notification.id === action.payload.id) {
        return action.payload;
      }
      return notification;
    });
  });
  builder.addCase(changeStatus.rejected, (state) => {
    state.changeStatusDataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
