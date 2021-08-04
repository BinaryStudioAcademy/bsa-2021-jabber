import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataUrl } from 'helpers/helpers';
import {
  AsyncThunkConfig,
  Podcast,
  PodcastFormPayload,
  User,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<Podcast, PodcastFormPayload, AsyncThunkConfig>(
  ActionType.CREATE_PODCAST,
  async (podcastPayload, { getState, extra }) => {
    const { podcastApi } = extra;
    const { auth } = getState();
    const [file] = podcastPayload.image ?? [];

    return podcastApi.create({
      userId: (<User>auth.user).id,
      description: podcastPayload.description,
      name: podcastPayload.name,
      imageDataUrl: file ? await getDataUrl(file) : null,
    });
  },
);

export { create };
