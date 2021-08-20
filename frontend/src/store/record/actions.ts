import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const initRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.INIT_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.init();
});

const startRecord = createAsyncThunk<MediaStream | undefined, undefined, AsyncThunkConfig>
(ActionType.START_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  const stream = recordAudioService.start();

  return stream;
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
(ActionType.STOP_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  const audioDataUrl = recordAudioService.stop();

  return audioDataUrl;
});

const setLiveStream = createAction<MediaStream>(ActionType.SET_LIVE_STREAM);

export {
  initRecord,
  startRecord,
  pauseRecord,
  resumeRecord,
  stopRecord,
  setLiveStream,
};
