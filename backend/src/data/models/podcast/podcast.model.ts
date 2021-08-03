import { Model } from 'objection';
import { TableName, PodcastDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Image } from '~/data/models/image/image.model';

class Podcast extends Abstract {
  [PodcastDTOKey.NAME]: string;

  [PodcastDTOKey.USER_ID]: number;

  [PodcastDTOKey.IMAGE_ID]: number | null;

  [PodcastDTOKey.DESCRIPTION]: string;

  static get tableName(): string {
    return TableName.PODCASTS;
  }

  static relationMappings = {
    imageRel: {
      relation: Model.HasOneRelation,
      modelClass: Image,
      join: {
        from: 'podcasts.image_id',
        to: 'images.id',
      },
    },
  };
}

export { Podcast };
