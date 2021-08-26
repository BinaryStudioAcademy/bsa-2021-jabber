import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig, Episode, StartRecordActionPayload } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { ActionType } from './common';

const initRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.INIT_RECORD, (_arg, { extra }) => {
  const { recordAudioService } = extra;
  recordAudioService.init();
});

const startRecord = createAsyncThunk<StartRecordActionPayload, string, AsyncThunkConfig>
(ActionType.START_RECORD, (id, { extra }) => {
  const { recordAudioService } = extra;
  const stream = recordAudioService.start();

  return {
    stream,
    id,
  };
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

const stopRecord = createAsyncThunk<void, string, AsyncThunkConfig>
(ActionType.STOP_RECORD, (_arg, { extra, getState }) => {
  const { recordAudioService, navigationService } = extra;
  const { episode } = getState();
  const { id, podcastId }  = <Episode>episode.episode;

  recordAudioService.stop();

  navigationService.push(`${AppRoute.PODCASTS}/${podcastId}${AppRoute.EPISODES_EDIT}/${id}`);
});

const resetState = createAction(ActionType.RESET_STATE);

const setLiveStream = createAction<MediaStream>(ActionType.SET_LIVE_STREAM);

export {
  initRecord,
  startRecord,
  pauseRecord,
  resumeRecord,
  stopRecord,
  setLiveStream,
  resetState,
};
