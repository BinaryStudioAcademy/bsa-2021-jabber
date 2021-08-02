import { TableName, PodcastDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Podcast extends Abstract {
  [PodcastDTOKey.NAME]: string;

  [PodcastDTOKey.USER_ID]: number;

  [PodcastDTOKey.IMAGE_ID]: number | null;

  static get tableName(): string {
    return TableName.PODCASTS;
  }
}

export { Podcast };
