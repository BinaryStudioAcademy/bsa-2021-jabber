import { Model } from 'objection';
import { TableName, EpisodeDTOKey } from '~/common/enums/enums';
import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';
import { Shownote } from '~/data/models/shownote/shownote.model';
import { Record } from '~/data/models/record/record.model';
import { Podcast } from '~/data/models/podcast/podcast.model';
import { UserFavouriteEpisode } from '~/data/models/user-favourite-episode/user-favourite-episode.model';
import { Comment } from '~/data/models/comment/comment.model';
import { PlaylistEpisode } from '~/data/models/playlist-episode/playlist-episode.model';
import { User } from '~/data/models/user/user.model';

class Episode extends Abstract {
  [EpisodeDTOKey.NAME]: string;

  [EpisodeDTOKey.USER_ID]: number;

  [EpisodeDTOKey.PODCAST_ID]: number;

  [EpisodeDTOKey.IMAGE_ID]: number | null;

  [EpisodeDTOKey.IMAGE]: Image | null;

  [EpisodeDTOKey.RECORD]: Record | null;

  [EpisodeDTOKey.TYPE]: EpisodeType;

  [EpisodeDTOKey.DESCRIPTION]: string;

  [EpisodeDTOKey.SHOWNOTES]: Shownote[];

  [EpisodeDTOKey.STATUS]: EpisodeStatus;

  [EpisodeDTOKey.PODCAST]: Podcast;

  static get tableName(): string {
    return TableName.EPISODES;
  }

  static relationMappings = {
    image: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'episodes.image_id',
        to: 'images.id',
      },
    },
    shownotes: {
      relation: Model.HasManyRelation,
      modelClass: Shownote,
      join: {
        from: 'episodes.id',
        to: 'shownotes.episode_id',
      },
    },
    record: {
      relation: Model.HasOneRelation,
      modelClass: Record,
      join: {
        from: 'episodes.id',
        to: 'records.episode_id',
      },
    },
    favourites: {
      relation: Model.HasManyRelation,
      modelClass: UserFavouriteEpisode,
      join: {
        from: 'episodes.id',
        to: 'users_favourite_episodes.episode_id',
      },
    },
    playlistEpisodes: {
      relation: Model.HasManyRelation,
      modelClass: PlaylistEpisode,
      join: {
        from: 'episodes.id',
        to: 'playlists_episodes.episode_id',
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
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'episodes.id',
        to: 'comments.episode_id',
      },
    },
    user: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'episodes.user_id',
        to: 'users.id',
      },
    },
  };
}

export { Episode };
