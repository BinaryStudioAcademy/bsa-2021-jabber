import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { getCountUncheckedUserNotifications } from './actions';

type State = {
  dataStatus: DataStatus;
  countUncheckedNotification: number;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  countUncheckedNotification: 0,
};

const reducer = createReducer(initialState, (builder) => {
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
});

export { reducer };
