import { createAsyncThunk } from '@reduxjs/toolkit';
import { Episode, Comment, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadEpisode = createAsyncThunk<Episode, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE, async (id, { extra }) => {
  const { episodeApi } = extra;
  const episode = await episodeApi.getById(id);

  return episode;
});

const loadCommentsByEpisodeId = createAsyncThunk<Comment[], number, AsyncThunkConfig>
(ActionType.LOAD_COMMENTS_BY_EPISODE_ID, async (episodeId, { extra }) => {
  const { commentApi } = extra;
  const comments = await commentApi.getAllCommentsByEpisodeId(episodeId);

  return comments;
});

export { loadEpisode, loadCommentsByEpisodeId };
