import { Model } from 'objection';
import {
  TableName,
  PlaylistDTOKey,
  PlaylistStatus,
} from '~/common/enums/enums';
import { Image } from '~/data/models/image/image.model';
import { Abstract } from '../abstract/abstract.model';
import { Episode } from '~/data/models/episode/episode.model';
import { Podcast } from '~/data/models/podcast/podcast.model';

class Playlist extends Abstract {
  [PlaylistDTOKey.USER_ID]: number;

  [PlaylistDTOKey.NAME]: string;

  [PlaylistDTOKey.COVER_ID]: number | null;

  [PlaylistDTOKey.DESCRIPTION]: string;

  [PlaylistDTOKey.STATUS]: PlaylistStatus;

  [PlaylistDTOKey.COVER]: Image | null;

  [PlaylistDTOKey.EPISODES]: Episode[];

  static get tableName(): string {
    return TableName.PLAYLISTS;
  }

  static relationMappings = {
    cover: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'playlists.cover_id',
        to: 'images.id',
      },
    },
    episodes: {
      relation: Model.ManyToManyRelation,
      modelClass: Episode,
      join: {
        from: 'playlists.id',
        through: {
          from: 'playlists_episodes.playlist_id',
          to: 'playlists_episodes.episode_id',
        },
        to: 'episodes.id',
      },
    },
    podcast: {
      relation: Model.HasOneRelation,
      modelClass: Podcast,
      join: {
        from: 'episodes.podcast_id',
        to: 'podcasts.id',
      },
    },
  };
}

export { Playlist };
