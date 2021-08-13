import { Model } from 'objection';
import { TableName, PodcastDTOKey, PodcastType } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';
import { User } from '~/data/models/user/user.model';

class Podcast extends Abstract {
  [PodcastDTOKey.NAME]: string;

  [PodcastDTOKey.USER_ID]: number;

  [PodcastDTOKey.IMAGE_ID]: number | null;

  [PodcastDTOKey.COVER_ID]: number | null;

  [PodcastDTOKey.IMAGE]: Image | null;

  [PodcastDTOKey.DESCRIPTION]: string;

  [PodcastDTOKey.TYPE]: PodcastType;

  [PodcastDTOKey.GENRE_ID]: number;

  [PodcastDTOKey.USER]: User;

  static get tableName(): string {
    return TableName.PODCASTS;
  }

  static relationMappings = {
    image: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'podcasts.image_id',
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
  };
}

export { Podcast };
