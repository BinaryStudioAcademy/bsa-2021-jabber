import { Podcast } from 'common/types/types';

enum ActionType {
  CREATE_PODCAST = 'configurate-podcast/create-podcast',
  EDIT_PODCAST = 'configurate-podcast/edit-podcast',
  LOAD_PODCAST = 'configurate-podcast/load-podcast',
  LOAD_GENRES = 'configurate-podcast/load-genres',
  DELETE_PODCAST = 'configurate-podcast/delete-podcast',
  RESET_STATE = 'configurate-podcast/reset-state',
}

type LoadPodcastPayload = {
  podcast: Podcast;
  invitationCode: string;
};

export { ActionType };
export type { LoadPodcastPayload };
