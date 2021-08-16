import { createReducer } from '@reduxjs/toolkit';
import { RecordStatus } from 'common/enums/enums';
import { pauseRecord, resumeRecord, startRecord, stopRecord } from './actions';
import { configurateEpisode as ConfigurateEpisodeActions } from 'store/actions';

type State = {
  recordStatus: RecordStatus;
  recordDataUrl: string;
};

const initialState: State = {
  recordStatus: RecordStatus.INACTIVE,
  recordDataUrl: '',
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
    state.recordDataUrl = action.payload;
  });
  builder.addCase(ConfigurateEpisodeActions.edit.fulfilled, (state) => {
    Object.assign(state, initialState);
  });
});

export { reducer };
