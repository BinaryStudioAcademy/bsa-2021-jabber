import { TableName, PodcastDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Podcast extends Abstract {
  [PodcastDTOKey.NAME]: string;

  [PodcastDTOKey.USER_ID]: number;

  static get tableName(): string {
    return TableName.PODCASTS;
  }
}

export { Podcast };
