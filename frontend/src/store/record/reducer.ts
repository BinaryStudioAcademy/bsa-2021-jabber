import { createReducer } from '@reduxjs/toolkit';
import { RecordStatus } from 'common/enums/enums';
import { pauseRecord, resumeRecord, startRecord, stopRecord, resetState, setLiveStream } from './actions';

type State = {
  recordStatus: RecordStatus;
  hasLiveRecord: boolean;
  liveStream: MediaStream | null;
};

const initialState: State = {
  recordStatus: RecordStatus.INACTIVE,
  hasLiveRecord: false,
  liveStream: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(startRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.RECORDING;
  });
  builder.addCase(pauseRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.PAUSED;
  });
  builder.addCase(resumeRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.RECORDING;
  });
  builder.addCase(stopRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.INACTIVE;
    state.hasLiveRecord = true;
  });
  builder.addCase(resetState, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(setLiveStream, (state, action) => {
    state.liveStream = action.payload;
  });
});

export { reducer };
