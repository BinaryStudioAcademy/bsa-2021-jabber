import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Episode,
  AsyncThunkConfig,
  EpisodeFormPayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';
import { getFileFromFileList, getDataUrl } from 'helpers/helpers';
import { DEFAULT_PODCAST_ID } from 'common/constants/constants';
import { NotificationMessage, NotificationTitle } from 'common/enums/enums';

const createEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>
(ActionType.CREATE_EPISODE, async (createEpisodePayload, { getState, extra }) => {
  const { episodeApi, notificationService } = extra;
  const { auth } = getState();
  const file = getFileFromFileList(createEpisodePayload.record);
  const episodes = await episodeApi.create({
    name: createEpisodePayload.name,
    description: createEpisodePayload.description,
    podcastId: DEFAULT_PODCAST_ID,
    type: createEpisodePayload.type,
    userId: (<User>auth.user).id,
    recordDataUrl: file ? await getDataUrl(file) : null,
  });

  notificationService.success(NotificationTitle.SUCCESS, `The episode ${NotificationMessage.SUCCESS_CREATED}`);
  return episodes;
});

export { createEpisode };
