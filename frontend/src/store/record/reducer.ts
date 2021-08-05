import { createReducer } from '@reduxjs/toolkit';
import { RecordStatus } from 'common/enums/enums';
import { pauseRecord, resumeRecord, startRecord, stopRecord } from './actions';

type State = {
  recordStatus: RecordStatus;
  dataUrl: string;
};

const initialState: State = {
  recordStatus: RecordStatus.INACTIVE,
  dataUrl: '',
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
  builder.addCase(stopRecord.fulfilled, (state, action) => {
    state.recordStatus = RecordStatus.INACTIVE;
    state.dataUrl = action.payload;
  });
});

export { reducer };
