import { TableName, PodcastFollowerDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class PodcastFollower extends Abstract {
  [PodcastFollowerDTOKey.PODCAST_ID]: number;

  [PodcastFollowerDTOKey.FOLLOWER_ID]: number;

  static get tableName(): string {
    return TableName.PODCASTS_FOLLOWERS;
  }
}

export { PodcastFollower };
