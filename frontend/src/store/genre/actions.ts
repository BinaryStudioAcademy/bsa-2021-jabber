import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Genre,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType } from './common';

const loadGenres = createAsyncThunk<Genre, undefined, AsyncThunkConfig>
(ActionType.LOAD_GENRES, async (_args, { extra }) => {
  const { genreApi } = extra;
  const episode = await genreApi.getAll();

  return episode;
});

export { loadGenres };
