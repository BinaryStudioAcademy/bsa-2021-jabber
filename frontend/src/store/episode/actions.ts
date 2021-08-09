import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  User,
  Episode,
  Comment,
  CommentFormCreatePayload,
  AsyncThunkConfig,
  Record,
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

const loadRecordByEpisodeId = createAsyncThunk<Record, number, AsyncThunkConfig>
(ActionType.LOAD_RECORD_BY_EPISODE_ID, async (episodeId, { extra }) => {
  const { recordApi } = extra;
  const record = await recordApi.getByEpisodeId(episodeId);

  return record;
});

export {
  loadEpisode,
  loadCommentsByEpisodeId,
  createComment,
  loadRecordByEpisodeId,
};
