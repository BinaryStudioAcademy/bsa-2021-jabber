import { Model } from 'objection';
import { TableName, PodcastDTOKey, PodcastType } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';

class Podcast extends Abstract {
  [PodcastDTOKey.NAME]: string;

  [PodcastDTOKey.USER_ID]: number;

  [PodcastDTOKey.IMAGE_ID]: number | null;

  [PodcastDTOKey.COVER_ID]: number | null;

  [PodcastDTOKey.IMAGE]: Image | null;

  [PodcastDTOKey.COVER]: Image | null;

  [PodcastDTOKey.DESCRIPTION]: string;

  [PodcastDTOKey.TYPE]: PodcastType;

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
    cover: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'podcasts.cover_id',
        to: 'images.id',
      },
    },
  };
}

export { Podcast };
