import { PlaylistEpisodePayloadKey } from '~/common/enums/enums';

type PlaylistEpisodePayload = {
  [PlaylistEpisodePayloadKey.PLAYLIST_ID]: number;
  [PlaylistEpisodePayloadKey.EPISODE_ID]: number;
};

export type { PlaylistEpisodePayload };
