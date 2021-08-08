import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Episode,
  Comment,
  CommentCreatePayload,
  AsyncThunkConfig,
  User,
} from 'common/types/types';
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
  const comments = await commentApi.getAllByEpisodeId(episodeId);

  return comments;
});

const createComment = createAsyncThunk<Comment, CommentCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_COMMENT, async (payload, { extra, getState }) => {
  const { commentApi } = extra;
  const { auth, episode: { episode } } = getState();
  const comment = await commentApi.create({
    ...payload,
    userId: (<User>auth.user).id,
    episodeId: (<Episode>episode).id,
  });

  return comment;
});

export { loadEpisode, loadCommentsByEpisodeId, createComment };
