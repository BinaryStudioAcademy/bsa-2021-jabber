import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  User,
  Episode,
  Comment,
  CommentFormCreatePayload,
  AsyncThunkConfig,
} from 'common/types/types';
import { ActionType, LoadEpisodePayload } from './common';

const loadEpisodePayload = createAsyncThunk<LoadEpisodePayload, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE_PAYLOAD, async (id, { extra }) => {
  const { episodeApi, podcastApi } = extra;
  const episode = await episodeApi.getById(id);
  const podcast = await podcastApi.getById(episode.podcastId);

  return {
    episode,
    podcast,
  };
});

const loadCommentsByEpisodeId = createAsyncThunk<Comment[], number, AsyncThunkConfig>
(ActionType.LOAD_COMMENTS_BY_EPISODE_ID, async (episodeId, { extra }) => {
  const { commentApi } = extra;
  const comments = await commentApi.getAllByEpisodeId(episodeId);

  return comments;
});

const createComment = createAsyncThunk<Comment, CommentFormCreatePayload, AsyncThunkConfig>
(ActionType.CREATE_COMMENT, async (payload, { extra, getState }) => {
  const { commentApi } = extra;
  const { auth, episode } = getState();
  const comment = await commentApi.create({
    ...payload,
    userId: (<User>auth.user).id,
    episodeId: (<Episode>episode.episode).id,
  });

  return comment;
});

const deleteComment = createAsyncThunk<Comment[], number, AsyncThunkConfig>
(ActionType.DELETE_COMMENT, async (id, { extra, getState }) => {
  const { commentApi } = extra;
  const { episode } = getState();
  const comments = episode.comments.filter((comment) => comment.id !== id);

  await commentApi.delete(id);

  return comments;
});

const updateComments = createAction<Comment>(ActionType.UPDATE_COMMENTS);

export {
  loadEpisodePayload,
  loadCommentsByEpisodeId,
  createComment,
  updateComments,
  deleteComment,
};
