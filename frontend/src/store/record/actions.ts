import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, Episode } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
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

const stopRecord = createAsyncThunk<void, undefined, AsyncThunkConfig>
(ActionType.STOP_RECORD, async (_arg, { extra, getState }) => {
  const { recordAudioService, navigationService } = extra;
  const { episode } = getState();
  const { id, podcastId }  = <Episode>episode.episode;

  recordAudioService.stop();

  navigationService.push(`${AppRoute.PODCASTS}/${podcastId}${AppRoute.EPISODES_EDIT}/${id}`);
});

export {
  initRecord,
  startRecord,
  pauseRecord,
  resumeRecord,
  stopRecord,
};
