import { Episode, Podcast } from 'common/types/types';

enum ActionType {
  LOAD_EPISODE = 'episodes/load-episode',
  LOAD_COMMENTS_BY_EPISODE_ID = 'comments/load-comments-by-episode-id',
  LOAD_EPISODE_PAYLOAD = 'podcast/episode-payload',
  CREATE_COMMENT = 'comments/create-comment',
  UPDATE_COMMENTS = 'comments/update-comments',
  DELETE_COMMENT = 'comment/delete-comment',
  UPDATE_COMMENTS_AFTER_DELETE = 'comments/update-after-delete',
  LEAVE_EPISODE = 'episodes/leave-episode',
  CHECK_EPISODE_IS_FAVOURITE = 'episodes/check-episode-is-favourite',
  TOGGLE_FAVOURITE = 'episodes/toggle-favourite',
}

type LoadEpisodePayload = {
  episode: Episode;
  podcast: Podcast;
};

export { ActionType };
export type { LoadEpisodePayload };
