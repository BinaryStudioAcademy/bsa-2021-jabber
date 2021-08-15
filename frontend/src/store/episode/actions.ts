import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  User,
  Episode,
  Comment,
  CommentFormCreatePayload,
  AsyncThunkConfig,
  Podcast,
} from 'common/types/types';
import { ActionType } from './common';

type PodcastAndEpisode = {
  episode : Episode;
  podcast: Podcast;
};

const loadEpisode = createAsyncThunk<PodcastAndEpisode, number, AsyncThunkConfig>
(ActionType.LOAD_EPISODE, async (id, { extra }) => {
  const { episodeApi, podcastApi } = extra;
  const episode = await episodeApi.getById(id);
  const podcast = await podcastApi.getById(episode.podcastId);

  const episodeAndPodcast = { episode, podcast };

  return episodeAndPodcast;
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

const updateComments = createAction<Comment>(ActionType.UPDATE_COMMENTS);

export { loadEpisode, loadCommentsByEpisodeId, createComment, updateComments };
