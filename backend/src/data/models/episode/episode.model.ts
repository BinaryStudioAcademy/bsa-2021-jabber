import { TableName, EpisodeDTOKey } from '~/common/enums/enums';
import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Episode extends Abstract {
  [EpisodeDTOKey.NAME]: string;

  [EpisodeDTOKey.USER_ID]: number;

  [EpisodeDTOKey.PODCAST_ID]: number;

  [EpisodeDTOKey.TYPE]: EpisodeType;

  [EpisodeDTOKey.DESCRIPTION]: string;

  [EpisodeDTOKey.STATUS]: EpisodeStatus;

  static get tableName(): string {
    return TableName.EPISODES;
  }
}

export { Episode };
