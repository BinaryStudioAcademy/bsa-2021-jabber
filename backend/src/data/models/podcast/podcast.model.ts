import { Model } from 'objection';
import { TableName, PodcastDTOKey, PodcastType } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';
import { User } from '~/data/models/user/user.model';
import { Genre } from '~/data/models/genre/genre.model';
import { QueryBuilder } from './common/query-builder/query-builder';

class Podcast extends Abstract {
  [PodcastDTOKey.NAME]: string;

  [PodcastDTOKey.USER_ID]: number;

  [PodcastDTOKey.IMAGE_ID]: number | null;

  [PodcastDTOKey.COVER_ID]: number | null;

  [PodcastDTOKey.IMAGE]: Image | null;

  [PodcastDTOKey.COVER]: Image | null;

  [PodcastDTOKey.DESCRIPTION]: string;

  [PodcastDTOKey.TYPE]: PodcastType;

  [PodcastDTOKey.GENRE_ID]: number | null;

  [PodcastDTOKey.USER]: User;

  [PodcastDTOKey.GENRE]: Genre | null;

  static get tableName(): string {
    return TableName.PODCASTS;
  }

  QueryBuilderType!: QueryBuilder<this>;
  static QueryBuilder = QueryBuilder;

  static relationMappings = {
    image: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'podcasts.image_id',
        to: 'images.id',
      },
    },
    cover: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'podcasts.cover_id',
        to: 'images.id',
      },
    },
    user: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'podcasts.user_id',
        to: 'users.id',
      },
    },
    genre: {
      relation: Model.HasOneRelation,
      modelClass: Genre,
      join: {
        from: 'podcasts.genre_id',
        to: 'genres.id',
      },
    },
  };
}

export { Podcast };
