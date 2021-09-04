import { PlaylistEpisodePayloadKey } from '~/common/enums/enums';
import { EpisodeWithPodcast } from '~/common/types/types';

type PlaylistEpisodeResponse = {
  [PlaylistEpisodePayloadKey.EPISODES]: EpisodeWithPodcast[];
  [PlaylistEpisodePayloadKey.TOTAL_COUNT]: number;
};

export type { PlaylistEpisodeResponse };
