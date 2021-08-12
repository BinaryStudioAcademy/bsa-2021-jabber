import { EpisodeFormPayload } from './episode-form-payload.type';

type CreateActionEpisodePayload = EpisodeFormPayload & {
  podcastId: number;
};

export type { CreateActionEpisodePayload };
