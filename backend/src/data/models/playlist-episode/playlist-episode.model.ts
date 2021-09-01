import {
  TableName,
  PlaylistEpisodeDTOKey,
} from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class PlaylistEpisode extends Abstract {
  [PlaylistEpisodeDTOKey.PLAYLIST_ID]: number;

  [PlaylistEpisodeDTOKey.EPISODE_ID]: number;

  static get tableName(): string {
    return TableName.PLAYLISTS_EPISODES;
  }

}

export { PlaylistEpisode };
