import { createReducer } from '@reduxjs/toolkit';
import { RecordStatus } from 'common/enums/enums';
import { pauseRecord, resumeRecord, startRecord, stopRecord, setLiveStream } from './actions';

type State = {
  recordStatus: RecordStatus;
  audioDataUrl: string;
  liveStream: MediaStream | null;
};

const initialState: State = {
  recordStatus: RecordStatus.INACTIVE,
  audioDataUrl: '',
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
  builder.addCase(stopRecord.fulfilled, (state, action) => {
    state.recordStatus = RecordStatus.INACTIVE;
    state.audioDataUrl = action.payload;
  });
  builder.addCase(setLiveStream, (state, action) => {
    state.liveStream = action.payload;
  });
});

export { reducer };
