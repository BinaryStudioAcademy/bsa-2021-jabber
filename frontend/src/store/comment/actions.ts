import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, AsyncThunkConfig } from 'common/types/types';
import { ActionType } from './common';

const loadComments = createAsyncThunk<Comment[], undefined, AsyncThunkConfig>
(ActionType.LOAD_COMMENTS, async (_args, { extra }) => {
  const { commentApi } = extra;
  const comments = await commentApi.getAll();

  return comments;
});

const loadCommentsByEpisodeId = createAsyncThunk<Comment[], number, AsyncThunkConfig>
(ActionType.LOAD_COMMENTS_BY_EPISODE_ID, async (episodeId, { extra }) => {
  const { commentApi } = extra;
  const comments = await commentApi.getAllCommentsByEpisodeId(episodeId);

  return comments;
});

export { loadComments, loadCommentsByEpisodeId };
