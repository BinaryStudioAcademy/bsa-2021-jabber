import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const initRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.INIT_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.init();
});

const startRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.START_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.start();
});

const pauseRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.PAUSE_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.pause();
});

const resumeRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.RESUME_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.resume();
});

const stopRecord = createAsyncThunk<string, undefined, AsyncThunkConfig>
(ActionType.STOP_RECORD, async (_arg, { extra }) => {
  const { recordAudioService } = extra;
  const audioDataUrl = await recordAudioService.stop();

  return audioDataUrl;
});

export {
  initRecord,
  startRecord,
  pauseRecord,
  resumeRecord,
  stopRecord,
};
