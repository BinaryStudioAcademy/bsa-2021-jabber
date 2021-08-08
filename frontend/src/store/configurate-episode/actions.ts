import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Episode,
  AsyncThunkConfig,
  EpisodeFormPayload,
  User,
  Podcast,
} from 'common/types/types';
import { getFileFromFileList, getDataUrl } from 'helpers/helpers';
import { ActionType } from './common';

const createEpisode = createAsyncThunk<Episode, EpisodeFormPayload, AsyncThunkConfig>
(ActionType.CREATE_EPISODE, async (createEpisodePayload, { getState, extra }) => {
  const { episodeApi } = extra;
  const { auth, podcast } = getState();

  const file = getFileFromFileList(createEpisodePayload.image);

  const episodes = await episodeApi.create({
    name: createEpisodePayload.name,
    description: createEpisodePayload.description,
    podcastId: (<Podcast>podcast.podcast).id,
    type: createEpisodePayload.type,
    userId: (<User>auth.user).id,
    imageDataUrl: file ? await getDataUrl(file) : null,
  });

  return episodes;
});

export { createEpisode };
