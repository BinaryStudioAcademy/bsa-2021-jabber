import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  Image,
  Podcast,
  PodcastCreatePayload,
} from 'common/types/types';
import { ActionType } from './common';

const create = createAsyncThunk<Podcast, PodcastCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_PODCAST, async (podcastPayload, { extra }) => {
  const { podcastApi } = extra;
  const podcast = await podcastApi.create(podcastPayload);

  return podcast;
});

const createCover = createAsyncThunk<Image, File, AsyncThunkConfig>
(ActionType.CREATE_COVER, async (imageFile, { extra }) => {
  const { imageApi } = extra;
  const cover = await imageApi.uploadImage(imageFile);

  return cover;
});

export { create, createCover };
