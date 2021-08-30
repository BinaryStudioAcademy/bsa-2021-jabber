import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, RecordStatus } from 'common/enums/enums';
import { pauseRecord, resumeRecord, startRecord, stopRecord, resetState, setLiveStream, initRecord } from './actions';

type State = {
  recordStatus: RecordStatus;
  recordInitStatus: DataStatus;
  liveStream: MediaStream | null;
  liveRecordDataUrl: string | null;
};

const initialState: State = {
  recordStatus: RecordStatus.INACTIVE,
  recordInitStatus: DataStatus.IDLE,
  liveStream: null,
  liveRecordDataUrl: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(initRecord.pending, (state) => {
    state.recordInitStatus = DataStatus.PENDING;
  });
  builder.addCase(initRecord.fulfilled, (state) => {
    state.recordInitStatus = DataStatus.FULFILLED;
  });
  builder.addCase(initRecord.rejected, (state) => {
    state.recordInitStatus = DataStatus.REJECTED;
  });
  builder.addCase(startRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.RECORDING;
  });
  builder.addCase(pauseRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.PAUSED;
  });
  builder.addCase(resumeRecord.fulfilled, (state) => {
    state.recordStatus = RecordStatus.RECORDING;
  });
  builder.addCase(stopRecord.fulfilled, (state, action) => {
    state.recordStatus = RecordStatus.INACTIVE;
    state.liveRecordDataUrl = action.payload;
  });
  builder.addCase(resetState, (state) => {
    Object.assign(state, initialState);
  });
  builder.addCase(setLiveStream, (state, action) => {
    state.liveStream = action.payload;
  });
});

export { reducer };
